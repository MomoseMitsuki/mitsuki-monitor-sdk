import xhrHook from "./xhr";
import fetchHook from "./fetch";

export interface ApiData {
	subType: "fetch" | "xhr";
	startTime: number;
	endTime: number;
	duration: number;
	url: RequestInfo | URL;
	method: string;
	status: number;
	success: boolean;
}

export default function api() {
	xhrHook();
	fetchHook();
}
