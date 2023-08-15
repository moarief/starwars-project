import { NavigationList, NavigationItem } from "@/lib/types";
import { Button } from "../ui/button";

type NavigationItemProps = {
  currentPath: string;
  handleNavigationChange: (category: string) => void;
};

/**
 * Navigation items component - displays all items in navigation
 *
 * @param {NavigationItemProps} {
  currentPath,
  handleRoute,
}
 * @returns {JSX.Element}
 */
const NavigationItems = ({
  currentPath,
  handleNavigationChange,
}: NavigationItemProps): JSX.Element => {
  return (
    <div className="flex gap-3">
      {NavigationList.map((item: NavigationItem) => {
        const getSelected = () =>
          currentPath === item.id ? "default" : "ghost";
        return (
          <Button
            key={item.id}
            onClick={() => handleNavigationChange(item.id)}
            variant={getSelected()}
          >
            <span>{item.title}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default NavigationItems;
