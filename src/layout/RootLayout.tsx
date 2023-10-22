import { Outlet } from "react-router-dom";
import MainNavigation from "../components/Navigation";
const RootLayout = () => {
	return (
		<div className="rootLayout h-full">
			<MainNavigation />
			<main className="col-[center-start/center-end] row-[2/3]">
				<Outlet />
			</main>
		</div>
	);
};

export default RootLayout;
