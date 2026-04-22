import React, { type ReactNode } from "react";
import { errHandler } from "./errHandler";

interface ErrorBoundaryProps {
	children: ReactNode;
	errShow?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	componentDidCatch(error: Error): void {
		errHandler(error);
	}

	render() {
		if (this.state.hasError) {
			return this.props.errShow || null;
		}
		return this.props.children;
	}
}
