import { lazyReportCache, report } from "../report";

interface NetworkInformationPolyfill extends EventTarget {
	downlink: number;
	effectiveType: "slow-2g" | "2g" | "3g" | "4g";
	rtt: number;
	saveData: boolean;
}
/**
 * Typings for navigator.connection gone since TS 4.8 #56962
 */
const connection: NetworkInformationPolyfill | undefined = (navigator as any).connection;

export type BehaviorData = PVData | PageStayTimeData | RouterChangeData | PageChangeData;

interface PVData {
	subType: "pv";
	referrer: string;
	effectiveType: string;
	rtt: number;
}

interface PageStayTimeData {
	subType: "pageStayTime";
	effectiveType: string;
	stayTime: number;
}

interface PageChangeData {
	subType: "pageChange";
	from: string;
	to: string;
}

interface RouterChangeData {
	subType: "vueRouterChange" | "reactRouterChange";
	params: Record<string, string | Array<string>>;
	query: Record<string, string | null | Array<string | null>>;
	name: string;
	from: string;
	to: string;
	stayTime: number;
}

export function pv() {
	const data: BehaviorData = {
		subType: "pv",
		referrer: document.referrer,
		effectiveType: connection ? connection.effectiveType : "",
		rtt: connection ? connection.rtt : 0
	};
	lazyReportCache("behavior", data);
}

export function pageStayTime() {
	const startTime = Date.now();
	window.addEventListener(
		"beforeunload",
		() => {
			report(
				"behavior",
				[
					{
						subType: "pageStayTime",
						effectiveType: connection ? connection.effectiveType : "",
						stayTime: Date.now() - startTime
					}
				],
				true
			);
		},
		true
	);
}

export function pageChange() {
	let from = document.referrer;
	window.addEventListener(
		"popState",
		() => {
			const to = window.location.href;
			lazyReportCache("behavior", {
				subType: "pageChange",
				from,
				to
			});
			from = to;
		},
		true
	);
	let oldURL = document.referrer;
	window.addEventListener(
		"hashchange",
		(event: HashChangeEvent) => {
			const newURL = event.newURL;
			lazyReportCache("behavior", {
				subType: "pageChange",
				from: oldURL,
				to: newURL
			});
			oldURL = newURL;
		},
		true
	);
}
