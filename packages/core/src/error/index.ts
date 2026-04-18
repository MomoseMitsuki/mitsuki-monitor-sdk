import lastCaptureEvent from "../utils/captureEvent";
import { getPaths } from "../utils/paths";
import { lazyReportCache } from "../report";

interface ErrorStackFrame {
	filename: string;
	functionName: string;
	lineno?: number;
	colno?: number;
}

type ErrorType = "jsError" | "promiseError" | "vueError" | "reactError";

interface JSErrorData extends ErrorStackFrame {
	errorType: ErrorType;
	paths: string;
	message: string;
	stack: string;
}

interface ResourceErrorData {
	errorType: "resourceError";
	filename: string;
	tagName: string;
	message: string;
}

export type ErrorData = JSErrorData | ResourceErrorData;

const FULL_MATCH =
	/^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;

// 限制只追溯4个
const STACKTRACE_LIMIT = 4;

function parseStackLine(line: string): ErrorStackFrame | null {
	const lineMatch = line.match(FULL_MATCH);
	if (!lineMatch) {
		return null;
	}
	const filename = lineMatch[2] || "<anonymous>";
	const functionName = lineMatch[1] || "";
	const lineno = parseInt(lineMatch[3]!, 10) || void 0;
	const colno = parseInt(lineMatch[4]!, 10) || void 0;
	return {
		filename,
		functionName,
		lineno,
		colno
	};
}

export function parseStackFrames(error: Error): Array<ErrorStackFrame> {
	const { stack } = error;
	if (!stack) return [];
	const frames: Array<ErrorStackFrame> = [];
	for (const line of stack.split("\n").slice(1)) {
		const frame = parseStackLine(line);
		if (frame?.filename) {
			frames.push(frame);
		}
	}
	return frames.slice(0, STACKTRACE_LIMIT);
}

export default function error() {
	// 资源错误没有冒泡, 只能在捕获阶段获取错误
	window.addEventListener(
		"error",
		function (event: ErrorEvent) {
			const target = event.target as any;
			const lastEvent = lastCaptureEvent();
			const paths = getPaths(lastEvent);
			// 资源错误
			if (target && (target.src || target.href)) {
				const data: ResourceErrorData = {
					errorType: "resourceError",
					filename: target.src || target.href,
					tagName: target.tagName,
					message: `加载 ${target.tagName} 失败`
				};
				lazyReportCache("error", data);
				// js错误
			} else {
				const errs = parseStackFrames(event.error);
				const data: JSErrorData = {
					errorType: "jsError",
					message: event.message,
					stack: event.error.stack,
					...errs[0]!,
					paths
				};
				lazyReportCache("error", data);
			}
		},
		true
	);

	// promise 错误
	window.addEventListener("unhandledrejection", function (event: PromiseRejectionEvent) {
		const reason = event.reason;
		const lastEvent = lastCaptureEvent();
		const paths = getPaths(lastEvent);
		if (reason instanceof Error) {
			const errs = parseStackFrames(reason);
			const data: JSErrorData = {
				errorType: "promiseError",
				message: reason.message,
				stack: reason.stack || "",
				...errs[0]!,
				paths
			};
			lazyReportCache("error", data);
		}
	});
}
