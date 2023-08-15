"use client";
import { usePathname, useRouter } from "next/navigation";

import Logo from "./molecules/logo";
import NavigationItems from "./molecules/navigationItems";

export const Navigation = () => {
  const route = useRouter();
  const pathName = usePathname();

  const currentPath = pathName.replace("/", "");

  /**
   * Change route and reset page number to one
   *
   * @param {string} category
   */
  const handleNavigationChange = (category: string) => {
    route.push(`/${category}?page=1`);
  };

  return (
    <div className="flex space-x-10 align-middle">
      <Logo imageUrl={"/star-wars-4-logo-svg-vector.svg"} redirectPath={"/"} />
      <NavigationItems handleNavigationChange={handleNavigationChange} currentPath={currentPath} />
    </div>
  );
};
