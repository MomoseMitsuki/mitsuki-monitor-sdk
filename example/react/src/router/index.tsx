import App from "../App";
import Action from "../view/action";
import Api from "../view/api";
import ErrorComp from "../view/error";
import { RouteErrorBoundary } from "@mitsuki-monitor-sdk/react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		ErrorBoundary: RouteErrorBoundary,
		children: [
			{
				element: <ErrorComp />,
				index: true
			},
			{
				path: "/error",
				element: <ErrorComp />
			},
			{
				path: "/api",
				element: <Api />
			},
			{
				path: "/action",
				element: <Action />
			}
		]
	}
]);

export default router;
