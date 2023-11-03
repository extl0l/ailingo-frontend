import { Link, useLocation } from "react-router-dom";
import { cn } from "../../../utils/tailwind.ts";

interface LibraryLink {
  to: string;
  title: string;
}

const defaultLibraryLinks: LibraryLink[] = [
  { to: "/library", title: "My sets" },
  { to: "/library/starred", title: "Starred sets" },
  { to: "/library/recent", title: "Recent" },
];

export const LibraryNavigation = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className="flex items-center gap-3.5">
        {defaultLibraryLinks.map((link) => (
          <li key={link.to}>
            <StyledLibraryLink
              link={link}
              isActive={location.pathname === link.to}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface StyledLibraryLinkProps {
  link: LibraryLink;
  isActive?: boolean;
}

const StyledLibraryLink = (props: StyledLibraryLinkProps) => {
  const { link, isActive } = props;

  const className =
    "py-3 relative opacity-50 hover:opacity-100 transition-opacity inline-block";
  return (
    <Link to={link.to} className={cn(className, isActive && "opacity-100")}>
      {link.title}
      {isActive && <ActiveLinkDecoration />}
    </Link>
  );
};

const ActiveLinkDecoration = () => {
  return (
    <span className="absolute w-4/5 h-1 bottom-0 left-1/2 -translate-x-1/2 bg-theme-green-light rounded-full" />
  );
};
