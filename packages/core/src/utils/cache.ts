import type { ReportType, ReportData } from "../report/type";
const cache = new Map<ReportType, Array<ReportData>>();

export function getCache() {
	return cache;
}

export function addCache(type: ReportType, data: ReportData) {
	if (cache.has(type)) {
		cache.get(type)!.push(data);
	} else {
		cache.set(type, [data]);
	}
}

export function clearCache() {
	cache.clear();
}
