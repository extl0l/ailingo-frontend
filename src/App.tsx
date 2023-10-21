import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./layout/HomePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [{ index: true, element: <HomePage /> }],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
