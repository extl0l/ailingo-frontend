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
import { StudySetDetailsPage } from "./features/studyset/StudySetDetailsPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
				path: "sets/:setId",
				element: <StudySetDetailsPage />,
			},
			{
				path: "sets/:setId/edit",
				element: <div>Edit course</div>,
			},
			{
				path: "sets/new",
				element: <CreateCourse />,
			},
		],
	},
	{
		path: "/:setId",
		element: <div>Learning methods list</div>,
	},

	{
		path: "/:setId/flashcards",
		element: <Flashcards />,
	},
	{
		path: "/:setId/test",
		element: <div>Test</div>,
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
