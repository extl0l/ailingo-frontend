import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./layout/HomePage";
import Flashcards from "./layout/Games/Flashcards";

// TODO: Implement loader() for routing

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "courses",
				element: <div>Course list</div>,
			},
			{
				path: "courses/:courseId",
				element: <div>CourseId</div>,
			},
			{
				path: "courses/:courseId/edit",
				element: <div>Edit course</div>,
			},
			{
				path: "courses/new",
				element: <div>Create cours</div>,
			},
		],
	},
	{
		path: "/:courseId",
		element: <div>Learning methods list</div>,
	},

	{
		path: "/:courseId/flashcards",
		element: <Flashcards />,
	},
	{
		path: "/:courseId/test",
		element: <div>Test</div>,
	},
]);

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default App;
