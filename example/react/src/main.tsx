import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";
import monitor from "@mitsuki-monitor-sdk/core";
import { ErrorBoundary } from "@mitsuki-monitor-sdk/react";

monitor.init({
	appId: "example-react-demo",
	reportUrl: "http://localhost:3001/report"
});

createRoot(document.getElementById("root")!).render(
	<ErrorBoundary>
		<RouterProvider router={router} />
	</ErrorBoundary>
);
