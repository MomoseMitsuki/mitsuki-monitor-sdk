type ComposedPathElements = [...Array<Element>, Document, Window];

export const getComposedPathEle = (e: Event): ComposedPathElements => {
	if (!e) return [document, window];
	const pathArr = e.composedPath && (e.composedPath() as ComposedPathElements);
	if ((pathArr || []).length) {
		return pathArr;
	}
	// e.composedPath方法不兼容, 手动获取
	let target = e.target as Element;
	const composedPath = [];
	while (target && target.parentElement!) {
		composedPath.push(target);
		target = target.parentElement;
	}
	composedPath.push(document.documentElement, document, window);
	return composedPath as ComposedPathElements;
};

export const getComposedPath = (e: Event) => {
	const composedPathEle = getComposedPathEle(e);
	const nodeLists = composedPathEle.reverse().slice(2) as Element[];
	const composedPath = nodeLists.map(ele => {
		let selector = ele.tagName.toLowerCase();
		if (ele.id) {
			selector += `#${ele.id}`;
		}
		if (ele.className) {
			selector += `.${ele.className}`;
		}
		return selector;
	});
	return composedPath;
};

export const getPaths = (e: Event) => {
	const composedPath = getComposedPath(e);
	const selectors = composedPath.join(" > ");
	return selectors;
};
