import $style from "./action.module.css";

function Action() {
	return (
		<div className={$style.row}>
			<button data-tracker="true" className="button-primary" value="Button用户行为收集">
				Button
			</button>
			<div data-tracker="true" className="button-primary button">
				innerText 用户行为收集
			</div>
		</div>
	);
}

export default Action;
