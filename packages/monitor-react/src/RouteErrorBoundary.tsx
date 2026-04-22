import { useRouteError } from "react-router-dom";
import { errHandler } from "./errHandler";

export default function RouteErrorBoundary() {
	const error = useRouteError();
	if (error instanceof Error) {
		errHandler(error);
	}
	return null;
}
