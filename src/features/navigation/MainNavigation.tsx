import {Link} from 'react-router-dom';
import {UserDetails} from './components/UserDetails.tsx';

export const MainNavigation = () => {
  return (
      <header>
        <UserDetails/>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/library">My Library</Link>
            </li>
            <li>
              <Link to="/chats">Chats</Link>
            </li>
            <li>
              <button>
                <img src="" alt="search"/>
              </button>
            </li>
          </ul>
        </nav>
      </header>
  );
};