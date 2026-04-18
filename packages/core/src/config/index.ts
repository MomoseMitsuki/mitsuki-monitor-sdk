export interface MonitorConfig {
	appId: string;
	userId: string;
	reportUrl: string;
	trackerAll: boolean;
	ua: string;
	vue?: any;
}

const config: MonitorConfig = {
	appId: "monitor-sdk-demo",
	userId: "mitsuki",
	reportUrl: "http://localhost:3001/report/",
	trackerAll: false,
	ua: navigator.userAgent
};
export default config;

export function setConfig<K extends keyof MonitorConfig>(options: Partial<MonitorConfig>) {
	const keys = Object.keys(options) as Array<K>;
	for (const key of keys) {
		if (options[key]) {
			config[key] = options[key];
		}
	}
}
