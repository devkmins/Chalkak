// Libraries
import { useQuery } from "react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { debounce } from "lodash";

// Package
import styled from "styled-components";

// Atoms
import { currentPostPageScrollState } from "../atoms/pageScrollAtoms";
import { isBackToMainState } from "../atoms/navigationBackAtoms";
import { mainPageScrollYState } from "../atoms/scrollYStateAtoms";

// Hooks
import useSearchClear from "../hooks/useSearchClear";
import useSplitPosts from "../hooks/useSplitPosts";
import useScrollEvent from "../hooks/useScrollEvent";

// React
import { useEffect } from "react";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Styles
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";

// Constants
import { POST_PATH, USER_PATH } from "../constants/paths";
import { ALL_POSTS_DATA } from "../constants/reactQueryKeys";

// Types
import { IIsMobile, IMediaQueriresType } from "../types/mediaQueriesType";
import { IRatioTypes } from "../types/ratioType";

const Container = styled.div`
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
`;

const ImagesContainer = styled.div``;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img<IRatioTypes>`
  width: 100%;
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

const ProfileImg = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 32.5px;
  height: 32.5px;
`;

const ImagesBox = styled.div<IIsMobile>`
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

function Posts() {
  const { data, refetch } = useQuery(ALL_POSTS_DATA, async () => {
    const response = await axios.get(
      `http://localhost:4000/posts?page=${page}`
    );
    const responseData = response.data;

    return responseData;
  });

  const searchKeywordsClear = useSearchClear();

  const { firstCol, secondCol, thirdCol } = useSplitPosts(data?.postsData);

  const [scrollY, setScrollY] = useRecoilState(mainPageScrollYState);

  const [page, setPage] = useRecoilState(currentPostPageScrollState);

  const isBackToMain = useRecoilValue(isBackToMainState);

  const location = useLocation();
  const path = location.pathname;

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

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
    <Container>
      {isMobile && (
        <ColumnsContainer
          $isMobile={isMobileString}
          $isTabletOrLaptop={isTabletOrLaptopString}
          $isDesktop={isDesktopString}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <ProfileContainer $isMobile={isMobileString}>
                    <ProfileBox $isMobile={isMobileString}>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}
                        $isMobile={isMobileString}>
                        <ProfileImg
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
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                </ImagesBox>
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
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <StyledLink
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
                        <ProfileImg
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
                </ImagesBox>
              ))}
          </ImagesContainer>
          <ImagesContainer>
            {secondCol &&
              secondCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <StyledLink
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
                        <ProfileImg
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
                </ImagesBox>
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
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <StyledLink
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
                        <ProfileImg
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
                </ImagesBox>
              ))}
          </ImagesContainer>
          <ImagesContainer>
            {secondCol &&
              secondCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <StyledLink
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
                        <ProfileImg
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
                </ImagesBox>
              ))}
          </ImagesContainer>
          <ImagesContainer>
            {thirdCol &&
              thirdCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={isMobileString}>
                  <StyledLink
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
                        <ProfileImg
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
                </ImagesBox>
              ))}
          </ImagesContainer>
        </ColumnsContainer>
      )}
    </Container>
  );
}

export default Posts;
