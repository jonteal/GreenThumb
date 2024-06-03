import { ReactElement } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { LayoutDashboard, LogOut, Settings, Users } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export type NavbarItemType = {
  label: string;
  href: string;
  icon: ReactElement;
  subItems?: NavbarItemType[];
};

const primaryNavItems: NavbarItemType[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/dashboard",
  },
  {
    label: "Clients",
    icon: <Users />,
    href: "/client",
  },
];

const secondaryNavItems: NavbarItemType[] = [
  {
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    label: "Clients",
    icon: <LogOut />,
    href: "/logout",
  },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <aside className="inset-y-0 left-0 z-10 hidden w-14 flex-col items-center justify-center border-r bg-sky-600 sm:flex">
        <div className="flex font-thin mb-16 mt-8">FS</div>
        <NavigationMenu>
          <NavigationMenuList className="flex-col">
            {primaryNavItems.map((item, i) => (
              <NavigationMenuItem key={"upper-nav-" + i} className="relative">
                <NavigationMenuTrigger>
                  <NavigationMenuLink
                    asChild
                    active={location.pathname.includes(item.href)}
                    className="p-2 rounded-sm data-[active]:bg-sky-600 text-white visited:text-white"
                  >
                    <Link to={item.href}>{item.icon}</Link>
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="items-end mb-4">
          <NavigationMenuList className="flex-col">
            {secondaryNavItems.map((item, i) => (
              <NavigationMenuItem key={"lower-nav-" + i} className="relative">
                <NavigationMenuTrigger>
                  <NavigationMenuLink
                    asChild
                    active={location.pathname.includes(item.href)}
                    className="p-2 rounded-sm data-[active]:bg-sky-600 text-white visited:text-white"
                  >
                    <Link to={item.href}>{item.icon}</Link>
                  </NavigationMenuLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
    </>
  );
};
