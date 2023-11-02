import { LibraryNavigation } from "../features/library/components/LibraryNavigation.tsx";
import { Outlet } from "react-router-dom";

export const LibraryLayout = () => {
  return (
    <>
      <LibraryNavigation />
      <Outlet />
    </>
  );
};
