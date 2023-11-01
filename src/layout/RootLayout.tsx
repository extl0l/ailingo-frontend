import {Outlet} from 'react-router-dom';
import {MainNavigation} from '../features/navigation/MainNavigation.tsx';

const RootLayout = () => {
  return (
      <div className="px-8 max-w-3xl mx-auto">
        <div className="pt-[4.5rem] pb-8">
          <MainNavigation/>
        </div>
        <Outlet/>
      </div>
  );
};

export default RootLayout;
