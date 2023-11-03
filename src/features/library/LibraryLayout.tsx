import { LibraryNavigation } from "./components/LibraryNavigation.tsx";
import { Outlet } from "react-router-dom";

export const LibraryLayout = () => {
  return (
    <>
      <div className="bg-theme-background-light-variant">
        <div className="max-w-3xl mx-auto px-8">
          <LibraryNavigation />
        </div>
      </div>
      <Outlet />
    </>
  );
};
