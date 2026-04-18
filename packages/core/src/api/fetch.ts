import { lazyReportCache } from "../report";
import type { ApiData } from "./index";
const originalFetch = window.fetch;

function overWriteFetch() {
	window.fetch = function newFetch(url: RequestInfo | URL, init?: RequestInit | undefined) {
		const startTime = Date.now();
		const reportData: ApiData = {
			startTime,
			url,
			method: init?.method || "GET",
			subType: "fetch",
			endTime: 0,
			duration: 0,
			status: 0,
			success: false
		};
		return originalFetch(url, init)
			.then(res => {
				reportData.endTime = Date.now();
				reportData.duration = reportData.endTime - reportData.startTime;
				reportData.status = res.status;
				reportData.success = res.ok;
				lazyReportCache("api", reportData);
				return res;
			})
			.catch(err => {
				reportData.endTime = Date.now();
				reportData.duration = reportData.endTime - reportData.startTime;
				reportData.status = err.status;
				reportData.success = err.ok;
				return err;
			});
	};
}

export default function fetchHook() {
	overWriteFetch();
}
