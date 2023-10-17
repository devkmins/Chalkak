// Libraries
import axios from "axios";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";

// Package
import styled from "styled-components";

// Atoms
import { currentSimilarPostsPageScrollState } from "../atoms/pageScrollAtoms";
import { isBackToSimilarPostsState } from "../atoms/navigationBackAtoms";
import { similarPostsScrollYState } from "../atoms/scrollYStateAtoms";

// React
import { useEffect, useState } from "react";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Styles
import { useDesktop } from "../styles/mediaQueries";
import { A_LITTILE_LIGHT_GRAY_COLOR, WHITE_COLOR } from "../constants/colors";

// Constants
import { POST_PATH, USER_PATH } from "../constants/paths";
import { SIMILAR_POSTS_DATA } from "../constants/reactQueryKeys";

// Hook
import useScrollEvent from "../hooks/useScrollEvent";

// Types
import { IPost } from "../types/postType";
import { IRatioTypes } from "../types/ratioType";
import { IIsDesktop } from "../types/mediaQueriesType";

interface IProp {
  title: string;
  postId: any;
}

const Container = styled.div`
  width: 100%;
`;

const ColumnsContainer = styled.div<IIsDesktop>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isDesktop === "true" ? "repeat(3, 31.5%)" : "repeat(2, 47.5%)"};
  grid-auto-rows: auto;
  grid-gap: 25px;
  justify-content: center;
  padding: 0px 15px;
  padding-top: 35px;
  width: 100%;
`;

const ImagesContainer = styled.div``;

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

const ProfileContainer = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: max-content;
  height: max-content;
  margin-bottom: 17.5px;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${A_LITTILE_LIGHT_GRAY_COLOR};
  font-size: 16px;

  &:hover {
    color: ${WHITE_COLOR};
    transition: color 0.25s;
  }
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 32.5px;
  height: 32.5px;
`;

const ImagesBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;

  &:hover {
    opacity: 0.875;

    ${ProfileContainer} {
      display: flex;
    }
  }
`;

function SimilarPosts({ title, postId }: IProp) {
  const { data, refetch } = useQuery(
    [SIMILAR_POSTS_DATA, title, postId],
    async () => {
      const response = await axios.get(
        `http://localhost:4000/post/similarPosts?page=${page}`,
        {
          params: { postTitle: title, postId },
        }
      );
      return response.data;
    }
  );

  const [page, setPage] = useRecoilState(currentSimilarPostsPageScrollState);

  const [scrollY, setScrollY] = useRecoilState(similarPostsScrollYState);

  const isBackToSimilarPosts = useRecoilValue(isBackToSimilarPostsState);

  const [firstCol, setFirstCol] = useState<IPost[]>([]);
  const [secondCol, setSecondCol] = useState<IPost[]>([]);
  const [thirdCol, setThirdCol] = useState<IPost[]>([]);

  const location = useLocation();
  const path = location.pathname;

  const isDesktop = useDesktop();
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
    const firstColImages: IPost[] = [];
    const secondColImages: IPost[] = [];
    const thirdColImages: IPost[] = [];

    if (!isDesktop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          if (index % 2 === 0) {
            firstColImages.push(post);
          } else if (index % 2 === 1) {
            secondColImages.push(post);
          }
        });
      }
    }

    if (isDesktop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          if (index % 3 === 0) {
            firstColImages.push(post);
          } else if (index % 3 === 1) {
            secondColImages.push(post);
          } else if (index % 3 === 2) {
            thirdColImages.push(post);
          }
        });
      }
    }

    setFirstCol(firstColImages);
    setSecondCol(secondColImages);
    setThirdCol(thirdColImages);
  }, [data, isDesktop]);

  useEffect(() => {
    if (isBackToSimilarPosts) {
      window.scrollTo(0, scrollY);
    }
  });

  useEffect(() => {
    if (!isBackToSimilarPosts) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <Container>
      {!isDesktop && (
        <ColumnsContainer $isDesktop={isDesktopString}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id}>
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
                  <ProfileContainer>
                    <ProfileBox>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}>
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
                <ImagesBox key={post?._id}>
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
                  <ProfileContainer>
                    <ProfileBox>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}>
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
        <ColumnsContainer $isDesktop={isDesktopString}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id}>
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
                  <ProfileContainer>
                    <ProfileBox>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}>
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
                <ImagesBox key={post?._id}>
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
                  <ProfileContainer>
                    <ProfileBox>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}>
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
                <ImagesBox key={post?._id}>
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
                  <ProfileContainer>
                    <ProfileBox>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}>
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

export default SimilarPosts;
