// Libraries
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// Atoms
import { isBackToUserPageState } from "../atoms/navigationBackAtoms";
import { userPageScrollYState } from "../atoms/scrollYStateAtoms";

// React
import { useEffect } from "react";

// Component
import SharedPostContainer from "./SharedPostContainer";

// Type
import { IUserData } from "../types/postType";

function UserContents({ data }: { data: IUserData }) {
  const setIsBackToUserPage = useSetRecoilState(isBackToUserPageState);

  const setScrollY = useSetRecoilState(userPageScrollYState);

  const location = useLocation();
  const path = location.pathname;

  const handleClickRememberScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const handleNavigation = () => {
      setIsBackToUserPage(true);
      setTimeout(() => setIsBackToUserPage(false), 500);

      return () => {
        window.removeEventListener("popstate", handleNavigation);
      };
    };

    window.addEventListener("popstate", handleNavigation);
  });

  return (
    <SharedPostContainer
      data={data}
      path={path}
      handleClickRememberScroll={handleClickRememberScroll}
      componentName="UserContents"
    />
  );
}

export default UserContents;
