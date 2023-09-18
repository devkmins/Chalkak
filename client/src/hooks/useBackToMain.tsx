import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { isBackToMainState } from "../atoms";

function useBackToMain() {
  const setIsBackToMain = useSetRecoilState(isBackToMainState);

  useEffect(() => {
    const handleNavigation = () => {
      setIsBackToMain(true);

      return () => {
        window.removeEventListener("popstate", handleNavigation);
      };
    };

    window.addEventListener("popstate", handleNavigation);
  });

  return null;
}

export default useBackToMain;
