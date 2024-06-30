import { ReactElement } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import {
  DollarSign,
  Handshake,
  LayoutDashboard,
  LogOut,
  Settings,
  ShoppingBasket,
  Sprout,
  Users,
} from "lucide-react";
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
  // {
  //   label: "Schedule",
  //   icon: <Clock />,
  //   href: "/schedule",
  // },
  {
    label: "Orders",
    icon: <DollarSign />,
    href: "/orders",
  },
  // {
  //   label: "Production",
  //   icon: <Pickaxe />,
  //   href: "/production",
  // },
  {
    label: "CRM",
    icon: <Handshake />,
    href: "/crm",
  },
  {
    label: "Products",
    icon: <ShoppingBasket />,
    href: "/products",
  },
  {
    label: "Crops",
    icon: <Sprout />,
    href: "/crops",
  },
  {
    label: "Team",
    icon: <Users />,
    href: "/team",
  },
];

const secondaryNavItems: NavbarItemType[] = [
  {
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    label: "Logout",
    icon: <LogOut />,
    href: "/logout",
  },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <aside className="inset-y-0 left-0 z-10 hidden w-40 flex-col items-center justify-center border-r bg-neutral-800 sm:flex">
        <div className="flex mb-16 text-xl mt-8 font-semibold italic text-green-700">
          Green<span className="text-green-600">Thumb</span>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="flex-col items-start">
            {primaryNavItems.map((item, i) => (
              <NavigationMenuItem key={"upper-nav-" + i} className="relative">
                <NavigationMenuLink
                  asChild
                  active={location.pathname.includes(item.href)}
                  className="p-2 rounded-sm data-[active]:bg-sky-600 text-white visited:text-white"
                >
                  <Link className="flex flex-row" to={item.href}>
                    <span className="mr-3">{item.icon}</span> {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu className="items-end mb-4">
          <NavigationMenuList className="flex-col items-start">
            {secondaryNavItems.map((item, i) => (
              <NavigationMenuItem key={"lower-nav-" + i} className="relative">
                <NavigationMenuLink
                  asChild
                  active={location.pathname.includes(item.href)}
                  className="p-2 rounded-sm data-[active]:bg-sky-600 text-white visited:text-white"
                >
                  <Link className="flex flex-row" to={item.href}>
                    <span className="mr-3">{item.icon} </span>
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </aside>
    </>
  );
};
