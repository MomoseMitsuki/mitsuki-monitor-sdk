import type { RouteLocationNormalized, RouteLocationNormalizedLoaded } from "vue-router";
import { lazyReportCache } from "@mitsuki-monitor-sdk/core";

let pageViewStartTime = Date.now();

export default function routerChange(to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded) {
	if (!from.name) return true;
	const stayTime = Date.now() - pageViewStartTime;
	pageViewStartTime = Date.now();
	lazyReportCache("behavior", {
		subType: "vueRouterChange" as const,
		params: to.params,
		query: to.query,
		name: to.name?.toString() || to.path,
		from: from.fullPath,
		to: to.fullPath,
		stayTime
	});
	return true;
}
