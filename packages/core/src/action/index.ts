import { lazyReportCache } from "../report";
import { getPaths } from "../utils/paths";
import config from "../config";
import { debounce } from "../utils/util";

export interface ActionData {
	eventType: string;
	tagName: string;
	x: number;
	y: number;
	paths: string;
	value: string;
}

export const tracker = (event: Event) => {
	// 全埋点不需要手动上报
	if (config.trackerAll) return;
	const target = event.target! as any;
	const data: ActionData = {
		eventType: event.type,
		tagName: target.tagName,
		x: (event as any).x || 0,
		y: (event as any).y || 0,
		paths: getPaths(event),
		value: target.value || target.innerText
	};
	lazyReportCache("action", data);
};

const debounceTracker = debounce((event: Event) => {
	const target = event.target as any;
	const dataTracker = target.getAttribute("data-tracker");
	if (config.trackerAll || dataTracker) {
		const data: ActionData = {
			eventType: event.type,
			tagName: target.tagName || "window",
			x: (event as any).x || 0,
			y: (event as any).y || 0,
			paths: getPaths(event),
			value: target.value || target.innerText
		};
		lazyReportCache("action", data);
	}
}, 500);

export const autoTracker = () => {
	const eventArr = ["click", "keydown", "blur", "focus", "touchstart", "touchend"] as const;
	eventArr.forEach(eventType => {
		document.addEventListener(eventType, debounceTracker, false);
	});
};
