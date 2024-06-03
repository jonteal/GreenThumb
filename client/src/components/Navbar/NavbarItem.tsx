import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { NavbarItemType } from "./Navbar";

export const NavbarItem = (item: NavbarItemType & { isActive: boolean }) => {
  const isActive = false;
  return (
    <NavigationMenuItem>
      <NavigationMenuLink>
        <Link to={item.href} className="flex justify-center items-center">
          <span className="sr-only">{item.label}</span>
        </Link>
      </NavigationMenuLink>
      {item.subItems ? (
        <>
          <NavigationMenuTrigger asChild>
            <NavigationMenuLink active={location.pathname === item.href}>
              <Link
                to={item.href}
                className="flex justify-center items-center gap-4 text-white text-sm font-light"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
            <NavigationMenuLink>Link</NavigationMenuLink>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </>
      ) : (
        <>
          <NavigationMenuTrigger>
            <NavigationMenuLink asChild active={isActive}>
              <Link
                to={item.href}
                className="flex justify-center items-center gap-4 text-white text-sm font-light"
              >
                {item.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuTrigger>
        </>
      )}
    </NavigationMenuItem>
  );
};
