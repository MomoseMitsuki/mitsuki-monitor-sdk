import { lazyReportCache, getPaths, parseStackFrames, lastCaptureEvent } from "@mitsuki-monitor-sdk/core";

export function errHandler(error: Error): void {
	const errs = parseStackFrames(error);
	const lastEvent = lastCaptureEvent();
	const paths = getPaths(lastEvent);
	const data = {
		errorType: "reactError" as const,
		message: error.message,
		stack: error.stack || "",
		...errs[0]!,
		paths
	};
	lazyReportCache("error", data);
}
