import React, { type ReactNode } from "react";
import { lazyReportCache, getPaths, parseStackFrames, lastCaptureEvent } from "@mitsuki-monitor-sdk/core";

interface ErrorBoundaryProps {
	children: ReactNode;
	errShow?: ReactNode;
}

export default class ErrorBoundary extends React.Component {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: Error): void {
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
}
