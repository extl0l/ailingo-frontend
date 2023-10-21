import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Navigation";
const RootLayout = () => {
	return (
		<div className="rootLayout">
			<MainNavigation />
			<Outlet />
		</div>
	);
};

export default RootLayout;
