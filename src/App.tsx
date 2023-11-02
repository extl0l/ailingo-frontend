import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Flashcards from "./layout/Games/Flashcards";
import CreateCourse from "./components/Course/index";
import {ClerkProvider} from '@clerk/clerk-react';
import {HomePage} from './pages/HomePage.tsx';

// TODO: Implement loader() for routing

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
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
				element: <CreateCourse />,
			},
		],
	},
	{
		path: "/:courseId",
		element: <div>Learning methods list</div>,
	},
      {
        index: true,
        element: <HomePage/>,
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

const clerkPublishableKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw 'Missing VITE_REACT_APP_CLERK_PUBLISHABLE_KEY';
}

const App = () => {
  return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <RouterProvider router={router}/>
      </ClerkProvider>
  );
};

export default App;
