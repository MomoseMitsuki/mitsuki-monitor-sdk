import { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { lazyReportCache } from "@mitsuki-monitor-sdk/core";

export const useRouterChangeReport = () => {
	const location = useLocation();
	const [fromPath, setFromPath] = useState<string>("");
	const params = useParams();
	const [search] = useSearchParams();
	let pageViewStartTime = Date.now();

	const formatParams = normalizeParams(params);
	const formatQuery = normalizeQuery(search);

	useEffect(() => {
		const handleRouteChange = () => {
			if (fromPath && fromPath !== location.pathname) {
				const stayTime = Date.now() - pageViewStartTime;
				pageViewStartTime = Date.now();
				lazyReportCache("behavior", {
					subType: "reactRouterChange",
					params: formatParams,
					query: formatQuery,
					name: location.pathname,
					from: fromPath,
					to: location.pathname,
					stayTime
				});
			}
			setFromPath(location.pathname);
		};
		handleRouteChange();
	}, [location]);
};

export default useRouterChangeReport;

function normalizeParams(params: Record<string, any>) {
	return Object.fromEntries(Object.entries(params).map(([k, v]) => [k, v == null ? "" : v]));
}

function normalizeQuery(query: Record<string, any>) {
	return Object.fromEntries(Object.entries(query).map(([k, v]) => [k, v == null ? null : v]));
}
