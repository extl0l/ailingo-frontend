import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Flashcards from "./layout/Games/Flashcards";
import CreateCourse from "./components/Course/index";
import { ClerkProvider } from "@clerk/clerk-react";
import { HomePage } from "./features/home/HomePage.tsx";
import { LibraryLayout } from "./features/library/LibraryLayout.tsx";

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
            element: <h1>My sets</h1>,
          },
          {
            path: "starred",
            element: <h1>Starred sets</h1>,
          },
          {
            path: "recent",
            element: <h1>Recent</h1>,
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

const clerkPublishableKey = import.meta.env
  .VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
if (!clerkPublishableKey) {
  throw "Missing VITE_REACT_APP_CLERK_PUBLISHABLE_KEY";
}

const App = () => {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <RouterProvider router={router} />
    </ClerkProvider>
  );
};

export default App;
