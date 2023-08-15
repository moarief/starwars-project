import Logo from "./molecules/logo";
import NavigationItems from "./molecules/navigationItems";

type NavigationProps = {
  currentPath: string;
  handleNavigationChange: (category: string) => void;
};

/**
 * Navigation component
 *
 * @param {NavigationProps} {
  currentPath,
  handleNavigationChange,
}
 * @returns {*}
 */
export const Navigation = ({
  currentPath,
  handleNavigationChange,
}: NavigationProps): JSX.Element => {
  return (
    <div className="flex space-x-10 align-middle">
      <Logo imageUrl={"/star-wars-4-logo-svg-vector.svg"} redirectPath={"/"} />
      <NavigationItems
        handleNavigationChange={handleNavigationChange}
        currentPath={currentPath}
      />
    </div>
  );
};
