import { UserDetails } from "./components/UserDetails.tsx";
import { NavigationLinks } from "./components/NavigationLinks.tsx";

export const MainNavigation = () => {
  return (
    <>
      <header className="grid items-center align-middle -my-4 py-2 sm:-my-0 sm:m-0 sm:flex justify-between grid-cols-1 grid-rows-2">
        <UserDetails />
        <NavigationLinks />
      </header>
    </>
  );
};
