import $style from "./error.module.css";
import logo from "../assets/react.svg";
import { useRef } from "react";

function ErrorComp() {
	const imgRef = useRef<HTMLImageElement>(null);

	function resourceErrorFn() {
		imgRef.current?.setAttribute("src", "https://xxx.png");
	}
	return (
		<div className={$style.row}>
			<button id="jsError" onClick={jsErrorFn} className="button-primary">
				js错误
			</button>
			<button id="promiseError" onClick={promiseErrorFn} className="button-primary">
				promise错误
			</button>
			<button id="resourceError" onClick={resourceErrorFn} className="button-primary">
				资源加载错误
			</button>
			<img src={logo} ref={imgRef} className={$style.resource} />
		</div>
	);
}

function jsErrorFn() {
	// TypeError
	const str = null as any;
	console.log(str.length);
}
function promiseErrorFn() {
	Promise.reject(new Error("promise error"));
}

export default ErrorComp;
