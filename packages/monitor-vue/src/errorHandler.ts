import { lazyReportCache, getPaths, parseStackFrames, lastCaptureEvent } from "@mitsuki-monitor-sdk/core";

export default function errHandler(err: any) {
	const errs = parseStackFrames(err);
	const lastEvent = lastCaptureEvent();
	const paths = getPaths(lastEvent);
	const data = {
		errorType: "vueError" as const,
		message: err.message,
		stack: err.stack || "",
		...errs[0]!,
		paths
	};
	lazyReportCache("error", data);
}
