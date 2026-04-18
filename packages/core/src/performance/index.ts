import { onCLS, onFCP, onTTFB, onLCP, onINP, type Metric } from "web-vitals";
import { lazyReportCache } from "../report";

export interface PerformanceData {
	name: string;
	value: number;
	rating: string;
	delta: number;
}

export default function performance() {
	onCLS(sendToAnalytics);
	onFCP(sendToAnalytics);
	onTTFB(sendToAnalytics);
	onLCP(sendToAnalytics);
	onINP(sendToAnalytics);
}

function sendToAnalytics(metric: Metric) {
	const { name, value, rating, delta } = metric;
	const data: PerformanceData = {
		name,
		value,
		rating,
		delta
	};
	lazyReportCache("performance", data);
}
