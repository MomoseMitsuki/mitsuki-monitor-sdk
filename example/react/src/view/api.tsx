import $style from "./api.module.css";

function Api() {
	return (
		<div className={$style.center}>
			<button className={`button-primary ${$style.item}`} onClick={xhrRequest}>
				xhr发送数据
			</button>
			<button className={`button-primary ${$style.item}`} onClick={fetchRequest}>
				fetch发送数据
			</button>
		</div>
	);
}

function xhrRequest() {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3001/test");
	xhr.send();
	xhr.onloadend = () => {
		console.log(xhr.responseText);
	};
}

function fetchRequest() {
	fetch("http://localhost:3001/test")
		.then(res => res.text())
		.then(console.log);
}
export default Api;
