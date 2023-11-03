import IconSearch from "../assets/search.svg";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/tailwind.ts";

interface NavigationLink {
  to: string;
  title: string;
}

const defaultNavigationLinks: NavigationLink[] = [
  { to: "/", title: "Home" },
  { to: "/library", title: "My library" },
  { to: "/chats", title: "Chats" },
];

const isActiveRoute = (
  currentPathname: string,
  routeLinkTo: string,
): boolean => {
  if (currentPathname === routeLinkTo) return true;
  return currentPathname.startsWith(`${routeLinkTo}/`);
};

export const NavigationLinks = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex gap-3.5 items-center">
        {defaultNavigationLinks.map((link) => (
          <li key={link.to}>
            <StyledNavigationLink
              link={link}
              isActive={isActiveRoute(location.pathname, link.to)}
            />
          </li>
        ))}
        <li>
          {/*TODO: Open search box*/}
          <button className="block opacity-50 hover:opacity-100 transition-opacity">
            <img src={IconSearch} alt="search" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

interface StyledNavigationLinkProps {
  link: NavigationLink;
  isActive?: boolean;
}

const StyledNavigationLink = (props: StyledNavigationLinkProps) => {
  const { link, isActive } = props;

  const className =
    "font-medium text-xl text-theme-brown-light opacity-50 hover:opacity-100 transition-opacity relative";
  return (
    <Link to={link.to} className={cn(className, isActive && "opacity-100")}>
      {link.title}
      {isActive && <ActiveLinkDecoration />}
    </Link>
  );
};

const ActiveLinkDecoration = () => {
  return (
    <span className="w-1.5 h-1.5 block bg-theme-green-light rounded-full absolute top-0 right-0 translate-x-1/2" />
  );
};
