import { Outlet } from "react-router-dom";
import { MainNavigation } from "../features/navigation/MainNavigation.tsx";

const RootLayout = () => {
  return (
    <>
      <div className="bg-theme-background-light-variant pt-[4.5rem] pb-5">
        <div className="max-w-3xl mx-auto px-8">
          <MainNavigation />
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
