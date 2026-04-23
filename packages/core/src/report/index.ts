import config from "../config";
import getUniqueID from "../utils/getUniqueID";
import { getCache, addCache, clearCache } from "../utils/cache";
import { debounce } from "../utils/util";
import type { ReportData, ReportType } from "./type";

const uniqueId = getUniqueID();

export function report(type: ReportType, data: Array<ReportData>, isImmediate = false) {
	const { reportUrl, appId, userId, username, ua } = config;
	if (reportUrl === null) {
		console.error("请配置上报地址");
		return;
	}

	const reportData = JSON.stringify({
		id: uniqueId,
		appId,
		userId,
		username,
		ua,
		type,
		data,
		currentTime: Date.now(),
		currentPage: window.location.href
	});
	const url = reportUrl + (reportUrl.endsWith("/") ? "" : "/") + type;
	console.log(data);
	if (isImmediate) {
		sendBeacon(url, reportData);
		return;
	}

	if (requestIdleCallback) {
		requestIdleCallback(() => sendBeacon(url, reportData), {
			timeout: 3000
		});
	} else {
		setTimeout(() => sendBeacon(url, reportData));
	}
}

export const reportAction = () => {
	const dataMap = getCache();
	if (dataMap.size) {
		for (const [type, data] of dataMap) {
			report(type, data);
		}
		clearCache();
	}
};

let debounceReport: typeof reportAction;
let lastTimeout = 0;

export function lazyReportCache(type: ReportType, data: ReportData, timeout = 3000) {
	addCache(type, data);
	if (!debounceReport || lastTimeout !== timeout) {
		// 清空所有缓存, 进行数据上报(防抖)
		debounceReport = debounce(reportAction, timeout);
		lastTimeout = timeout;
	}
	debounceReport();
}

function sendBeacon(reportUrl: string, reportData: string) {
	if (navigator.sendBeacon) {
		navigator.sendBeacon(reportUrl, reportData);
	} else if ("fetch" in window) {
		reportWithFetch(reportUrl, reportData);
	} else {
		if (reportData.length > 2 * 1024) {
			reportWithXHR(reportUrl, reportData);
		} else {
			reportWithImage(reportUrl, reportData);
		}
	}
}

function reportWithFetch(reportUrl: string, reportData: string) {
	fetch(reportUrl, {
		method: "POST",
		body: reportData,
		headers: {
			"Content-type": "application/json"
		},
		keepalive: true
	});
}

function reportWithXHR(reportUrl: string, reportData: string) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", reportUrl, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.send(reportData);
}

function reportWithImage(reportUrl: string, reportData: string) {
	const img = new Image();
	img.src = `${reportUrl}?data=${reportData}`;
}
