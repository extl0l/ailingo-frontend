import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Flashcards from "./layout/Games/Flashcards";
import CreateCourse from "./components/Course/index";
import AuthProvider from "./features/auth/AuthProvider.tsx";
import { HomePage } from "./features/home/HomePage.tsx";
import { LibraryLayout } from "./features/library/LibraryLayout.tsx";
import { MySetsPage } from "./features/library/MySetsPage.tsx";
import { StarredSetsPage } from "./features/library/StarredSetsPage.tsx";
import { RecentlyStudiedPage } from "./features/library/RecentlyStudiedPage.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

// TODO: Implement loader() for routing
const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: "library",
				element: <LibraryLayout />,
				children: [
					{
						index: true,
						element: <MySetsPage />,
					},
					{
						path: "starred",
						element: <StarredSetsPage />,
					},
					{
						path: "recent",
						element: <RecentlyStudiedPage />,
					},
				],
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
				element: <CreateCourse />,
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
	{
		path: "/login",
		element: <div>Login</div>,
	},
]);

const queryClient = new QueryClient();

const App = () => {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default App;
