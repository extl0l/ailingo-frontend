import {Link} from 'react-router-dom';

export const MainNavigation = () => {
  return (
      <header>
        <div>
          <button>
            <img src="" alt="User avatar"/>
          </button>
          <div>
            <p>Marcus</p>
            <p>5921 XP</p>
          </div>
        </div>

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