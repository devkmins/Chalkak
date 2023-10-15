// Libraries
import { Link, useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";

// Package
import styled from "styled-components";

// Atoms
import { isBackToUserPageState } from "../atoms/navigationBackAtoms";
import { userPageScrollYState } from "../atoms/scrollYStateAtoms";

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

// Hook
import useSplitPosts from "../hooks/useSplitPosts";

// Types
import { IUserData } from "../types/postType";
import { IIsMobile, IMediaQueriresType } from "../types/mediaQueriesType";
import { IRatioTypes } from "../types/ratioType";

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

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img<IRatioTypes>`
  width: 100%;
  max-height: max-content;
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
    margin-bottom: 12.5px;
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

function UserContents({ data }: { data: IUserData }) {
  const { firstCol, secondCol, thirdCol } = useSplitPosts(data);

  const setIsBackToUserPage = useSetRecoilState(isBackToUserPageState);

  const setScrollY = useSetRecoilState(userPageScrollYState);

  const location = useLocation();
  const path = location.pathname;

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

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
                      alt={`${post.title}-${post.description}-${Date.now()}`}
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
  );
}

export default UserContents;
