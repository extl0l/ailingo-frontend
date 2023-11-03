import { UserDetails } from "./components/UserDetails.tsx";
import { NavigationLinks } from "./components/NavigationLinks.tsx";

export const MainNavigation = () => {
  return (
    <header className="flex justify-between">
      <UserDetails />
      <NavigationLinks />
    </header>
  );
};
