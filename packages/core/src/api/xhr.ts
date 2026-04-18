import { lazyReportCache } from "../report";
import type { ApiData } from "./index";

const originalPrototype = XMLHttpRequest.prototype;
const originalOpen = originalPrototype.open;
const originalSend = originalPrototype.send;

function overWriteOpenAndSend() {
	let reportUrl: string | URL = "";
	let reportMethod = "";
	originalPrototype.open = function openHook(
		method: string,
		url: string | URL,
		async: boolean = true,
		username?: string | null,
		password?: string | null
	) {
		reportUrl = url;
		reportMethod = method;
		originalOpen.call(this, method, url, async, username, password);
	};
	originalPrototype.send = function sendHook(...args: Parameters<XMLHttpRequest["send"]>) {
		const startTime = Date.now();
		const onLoadEnd = () => {
			const endTime = Date.now();
			const duration = endTime - startTime;
			const { status } = this;
			const reportData: ApiData = {
				subType: "xhr",
				startTime,
				duration,
				endTime,
				url: reportUrl,
				method: reportMethod || "GET",
				status,
				success: status >= 200 && status < 300
			};
			lazyReportCache("api", reportData);
		};
		this.addEventListener("loadend", onLoadEnd, {
			capture: true,
			once: true
		});
		originalSend.apply(this, args);
	};
}

export default function xhrHook() {
	overWriteOpenAndSend();
}
