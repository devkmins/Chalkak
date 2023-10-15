// Libraries
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";

// Package
import styled from "styled-components";

// Atoms
import { isBackToSearchPostListState } from "../atoms/navigationBackAtoms";
import { searchPostListScrollYState } from "../atoms/scrollYStateAtoms";

// Components
import Header from "./Header";
import NoSearchResults from "./NoSearchResults";

// React
import { useEffect, useState } from "react";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Styles
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";

// React-Icons
import { RiImage2Fill } from "@react-icons/all-files/ri/RiImage2Fill";

// Constants
import { POST_PATH, USER_PATH } from "../constants/paths";

// Hook
import useSplitPosts from "../hooks/useSplitPosts";

// Types
import { IMediaQueriresType } from "../types/mediaQueriesType";
import { IIsMobile } from "../types/mediaQueriesType";
import { IRatioTypes } from "../types/ratioType";

const Container = styled.div``;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const PostsContainer = styled.div`
  width: 100%;
`;

const ColumnsContainer = styled.div<IMediaQueriresType>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isDesktop === "true"
      ? "repeat(3, 31.5%)"
      : props.$isTabletOrLaptop === "true"
      ? "repeat(2, 47.5%)"
      : props.$isMobile === "true"
      ? "repeat(1, 100%)"
      : ""};
  grid-auto-rows: auto;
  grid-gap: 25px;
  justify-content: center;
  padding: 0px ${(props) => (props.$isMobile === "true" ? "0px" : "15px")};
  padding-top: 50px;
  width: 100%;
`;

const ImagesContainer = styled.div``;

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  color: #000000d5;
  font-weight: 600;
  padding-left: 25px;
  border-bottom: 1px solid #d1d1d1;
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

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const SearchWord = styled.span`
  font-size: 27px;
  font-weight: 800;
  margin-left: 25px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img<IRatioTypes>`
  width: 100%;
  max-height: max-content;
  object-fit: contain;
  aspect-ratio: ${(props) => props.$ratioWidth} /
    ${(props) => props.$ratioHeight};
`;

const ProfileContainer = styled.div<IIsMobile>`
  display: none;
  position: absolute;
  bottom: 0;
  width: max-content;
  height: max-content;
  margin-bottom: 17.5px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    display: flex;
    position: static;
    margin-bottom: 12.5px
    `}
`;

const ProfileBox = styled.div<IIsMobile>`
  display: flex;
  align-items: center;
  padding: 0px ${(props) => (props.$isMobile === "true" ? "12.5px" : "20px")};
`;

const ProfileLink = styled(Link)<IIsMobile>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.$isMobile === "true" ? "black" : "#e0dfdf")};
  font-size: 16px;

  ${(props) =>
    props.$isMobile === "false" &&
    `
    &:hover {
      color: white;
      transition: color 0.25s;
    }
  `}
`;

const PostProfileImg = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 32.5px;
  height: 32.5px;
`;

const PostBox = styled.div<IIsMobile>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: ${(props) => (props.$isMobile === "true" ? "50px" : "25px")};

  &:hover {
    opacity: ${(props) => (props.$isMobile === "true" ? "1" : "0.875")};

    ${ProfileContainer} {
      display: flex;
    }
  }
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

  const { firstCol, secondCol, thirdCol } = useSplitPosts(data?.posts);

  const [scrollY, setScrollY] = useRecoilState(searchPostListScrollYState);

  const isBackToSearchPostList = useRecoilValue(isBackToSearchPostListState);

  const [page, setPage] = useState(1);

  const params = useParams();
  const searchKeyword = params.keyword;

  const location = useLocation();
  const path = location.pathname;

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

  const handleScroll = debounce(() => {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop >= scrollHeight - 100) {
      setPage((prev) => prev + 1);
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, 200);

  const handleClickRememberScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <PostsContainer>
              <ContentsContainer>
                <PhotoBox>
                  <StyledRiImage2Fill />
                  <span>사진 {data?.totalPostsLength}</span>
                </PhotoBox>
              </ContentsContainer>
              <SearchWord>{searchKeyword}</SearchWord>
              <PostsBox>
                {isMobile && (
                  <ColumnsContainer
                    $isMobile={isMobileString}
                    $isTabletOrLaptop={isTabletOrLaptopString}
                    $isDesktop={isDesktopString}>
                    <ImagesContainer>
                      {firstCol &&
                        firstCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                  </ColumnsContainer>
                )}
                {isTabletOrLaptop && (
                  <ColumnsContainer
                    $isMobile={isMobileString}
                    $isTabletOrLaptop={isTabletOrLaptopString}
                    $isDesktop={isDesktopString}>
                    <ImagesContainer>
                      {firstCol &&
                        firstCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {secondCol &&
                        secondCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                  </ColumnsContainer>
                )}
                {isDesktop && (
                  <ColumnsContainer
                    $isMobile={isMobileString}
                    $isTabletOrLaptop={isTabletOrLaptopString}
                    $isDesktop={isDesktopString}>
                    <ImagesContainer>
                      {firstCol &&
                        firstCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {secondCol &&
                        secondCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {thirdCol &&
                        thirdCol.map((post, index) => (
                          <PostBox key={post?._id} $isMobile={isMobileString}>
                            <StyledLink
                              to={`${POST_PATH}/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={handleClickRememberScroll}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt={`${post.title}-${
                                  post.description
                                }-${Date.now()}`}
                                $ratioWidth={post.ratioWidth[0]}
                                $ratioHeight={post.ratioHeight[0]}
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={isMobileString}>
                              <ProfileBox $isMobile={isMobileString}>
                                <ProfileLink
                                  to={`${USER_PATH}/${post.owner.username}`}
                                  state={path}
                                  onClick={handleClickRememberScroll}
                                  $isMobile={isMobileString}>
                                  <PostProfileImg
                                    src={
                                      post.owner.profileImage
                                        ? `http://localhost:4000/${post.owner.profileImage}`
                                        : defaultUserProfileImg
                                    }
                                    alt="유저의 프로필 이미지"
                                  />
                                  {post.owner.name}
                                </ProfileLink>
                              </ProfileBox>
                            </ProfileContainer>
                          </PostBox>
                        ))}
                    </ImagesContainer>
                  </ColumnsContainer>
                )}
              </PostsBox>
            </PostsContainer>
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
