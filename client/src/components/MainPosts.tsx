// Libraries
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// Atoms
import { currentPostPageScrollState } from "../atoms/pageScrollAtoms";
import { isBackToMainState } from "../atoms/navigationBackAtoms";
import { mainPageScrollYState } from "../atoms/scrollYStateAtoms";

// Hooks
import useSearchClear from "../hooks/useSearchClear";
import useScrollEvent from "../hooks/useScrollEvent";

// React
import { useEffect } from "react";

// Constant
import { ALL_POSTS_DATA } from "../constants/reactQueryKeys";

// Component
import SharedPostContainer from "./SharedPostContainer";

// Api
import { postApi } from "../apis/post";

function MainPosts() {
  const { data, refetch } = useQuery(ALL_POSTS_DATA, async () => {
    const response = await postApi.getMainPosts(page);

    return response.data;
  });

  const searchKeywordsClear = useSearchClear();

  const [scrollY, setScrollY] = useRecoilState(mainPageScrollYState);

  const [page, setPage] = useRecoilState(currentPostPageScrollState);

  const isBackToMain = useRecoilValue(isBackToMainState);

  const location = useLocation();
  const path = location.pathname;

  const loadMoreData = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const scrollEvent = useScrollEvent(loadMoreData);

  const handleClickRememberScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    if (isBackToMain) {
      window.scrollTo(0, scrollY);
    }
  });

  useEffect(() => {
    if (!isBackToMain) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <SharedPostContainer
      data={data?.postsData}
      path={path}
      handleClickRememberScroll={handleClickRememberScroll}
      componentName="MainPosts"
    />
  );
}

export default MainPosts;
