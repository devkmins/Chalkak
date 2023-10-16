import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  isBackToMainState,
  isBackToSearchPostListState,
  isBackToSimilarPostsState,
} from "../atoms/navigationBackAtoms";

function usePopStateEvent(prevPath: string) {
  const setIsBackToMain = useSetRecoilState(isBackToMainState);
  const setIsBackToSimilarPosts = useSetRecoilState(isBackToSimilarPostsState);
  const setIsBackToSearchPostList = useSetRecoilState(
    isBackToSearchPostListState
  );

  useEffect(() => {
    const handleNavigation = () => {
      if (prevPath === "/") {
        setIsBackToMain(true);
        setTimeout(() => setIsBackToMain(false), 500);
      } else if (prevPath?.split("/")[1] === "search") {
        setIsBackToSearchPostList(true);
        setTimeout(() => setIsBackToSearchPostList(false), 500);
      } else if (prevPath?.split("/")[1] === "post") {
        setIsBackToSimilarPosts(true);
        setTimeout(() => setIsBackToSimilarPosts(false), 500);
      }

      return () => {
        window.removeEventListener("popstate", handleNavigation);
      };
    };

    window.addEventListener("popstate", handleNavigation);
  });
}

export default usePopStateEvent;
