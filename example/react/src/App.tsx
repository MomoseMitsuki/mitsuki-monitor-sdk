import "./App.module.css";
import { Outlet, NavLink } from "react-router-dom";
import { useRouterChangeReport } from "@mitsuki-monitor-sdk/react";

function App() {
	useRouterChangeReport();
	return (
		<>
			<nav>
				<div style={{ margin: "auto" }}>
					<NavLink className="item" to="/error">
						错误监控
					</NavLink>
					<NavLink className="item" to="/api">
						请求数据采集
					</NavLink>
					<NavLink className="item" to="/action">
						用户行为采集
					</NavLink>
				</div>
			</nav>
			<Outlet />
		</>
	);
}

export default App;
