import {UserDetails} from './components/UserDetails.tsx';
import {NavigationLinks} from './components/NavigationLinks.tsx';

export const MainNavigation = () => {
  return (
      <header>
        <UserDetails/>
        <NavigationLinks/>
      </header>
  );
};