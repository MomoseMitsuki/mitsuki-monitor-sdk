import { v4 } from "uuid";

export interface MonitorConfig {
	appId: string;
	userId: string | null;
	username: string;
	reportUrl: string | null;
	trackerAll: boolean;
	ua: string;
}

const config: MonitorConfig = {
	appId: "",
	userId: null,
	username: "<anonymous>",
	reportUrl: null,
	trackerAll: false,
	ua: navigator.userAgent
};

if (!localStorage.getItem("anonymousId")) {
	localStorage.setItem("anonymousId", `anonymous:${v4()}`);
}

config.userId = localStorage.getItem("anonymousId");

export default config;

export function setConfig<K extends keyof MonitorConfig>(options: Partial<MonitorConfig>) {
	const keys = Object.keys(options) as Array<K>;
	for (const key of keys) {
		if (options[key]) {
			config[key] = options[key];
		}
	}
}
