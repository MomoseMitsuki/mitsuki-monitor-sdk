export const debounce = <T extends (...args: any[]) => any>(callback: T, timeout: number = 3000) => {
	let timer: number | undefined = void 0;
	const handler = (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), timeout);
	};
	return handler;
};
