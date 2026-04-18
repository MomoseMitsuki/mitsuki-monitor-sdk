import { type MonitorConfig, setConfig } from "./config";
import error from "./error";
import performance from "./performance";
import lastCaptureEvent from "./utils/captureEvent";
import { tracker, autoTracker } from "./action";
import { pv, pageStayTime, pageChange } from "./behavior";
import api from "./api";

const monitor = {
	init(options: Partial<MonitorConfig> = {}) {
		setConfig(options);
		error(); // 错误监控
		performance(); // 性能监控
		pv(); // 页面停留监控
		api(); // 用户请求监控
		autoTracker(); // 用户行为监控
	},
	tracker,
	pageStayTime,
	pageChange
};

export default monitor;
export * from "./report";
export * from "./error";
export * from "./utils/paths";
export { lastCaptureEvent };
