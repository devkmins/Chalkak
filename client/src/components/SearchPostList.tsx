// Libraries
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

// Package
import styled from "styled-components";

// Atoms
import { isBackToSearchPostListState } from "../atoms/navigationBackAtoms";
import { searchPostListScrollYState } from "../atoms/scrollYStateAtoms";

// Components
import Header from "./Header";
import NoSearchResults from "./NoSearchResults";
import SharedPostContainer from "./SharedPostContainer";

// React
import { useEffect, useState } from "react";

// React-Icons
import { RiImage2Fill } from "@react-icons/all-files/ri/RiImage2Fill";

// Hook
import useScrollEvent from "../hooks/useScrollEvent";

// Styles
import { BLACK_COLOR, LIGHT_GRAY_COLOR } from "../constants/colors";

const Container = styled.div``;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
`;

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${BLACK_COLOR};
  font-weight: 600;
  padding-left: 25px;
  border-bottom: 1px solid ${LIGHT_GRAY_COLOR};
  margin-bottom: 30px;
`;

const PhotoBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;
`;

const StyledRiImage2Fill = styled(RiImage2Fill)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-bottom: 2.5px;
`;

const SearchWord = styled.span`
  font-size: 27px;
  font-weight: 800;
  margin-left: 25px;
`;

function SearchPostList() {
  const { data, refetch } = useQuery("getSearchPostListData", async () => {
    const response = await axios.get(
      `http://localhost:4000/search/${searchKeyword}?page=${page}`,
      { withCredentials: true }
    );
    const responseData = response.data;

    return responseData;
  });

  const [scrollY, setScrollY] = useRecoilState(searchPostListScrollYState);

  const isBackToSearchPostList = useRecoilValue(isBackToSearchPostListState);

  const [page, setPage] = useState(1);

  const params = useParams();
  const searchKeyword = params.keyword;

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
    if (isBackToSearchPostList) {
      window.scrollTo(0, scrollY);
    }
  });

  useEffect(() => {
    if (!isBackToSearchPostList) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      {data?.posts?.length > 0 ? (
        <Container>
          <Header />
          <Box>
            <ContentsContainer>
              <PhotoBox>
                <StyledRiImage2Fill />
                <span>사진 {data?.totalPostsLength}</span>
              </PhotoBox>
            </ContentsContainer>
            <SearchWord>{searchKeyword}</SearchWord>
            <SharedPostContainer
              data={data?.posts}
              path={path}
              handleClickRememberScroll={handleClickRememberScroll}
              componentName="SearchPostList"
            />
          </Box>
        </Container>
      ) : (
        <Container>
          <Header />
          <NoSearchResults searchWord={searchKeyword || ""} />
        </Container>
      )}
    </>
  );
}

export default SearchPostList;
