import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentPostPageScrollState } from "../atoms/pageScrollAtoms";
import { isBackToMainState } from "../atoms/navigationBackAtoms";
import { mainPageScrollYState } from "../atoms/scrollYStateAtoms";
import useInitSearch from "../hooks/useInitSearch";
import { debounce } from "lodash";
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";
import { IIsMobile } from "../types/mediaQueriesType";
import { IMediaQueriresType } from "../types/mediaQueriesType";
import { IPostWithHashtags } from "../types/postType";
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
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  const [page, setPage] = useRecoilState(currentPostPageScrollState);

  const location = useLocation();
  const path = location.pathname;

  const { data, refetch } = useQuery("getAllPostsData", async () => {
    const response = await axios.get(
      `http://localhost:4000/posts?page=${page}`
    );
    const responseData = response.data;

    return responseData;
  });

  const handleScroll = debounce(() => {
    const windowHeight = window.innerHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (windowHeight + scrollTop >= scrollHeight - 50) {
      setPage((prev) => prev + 1);
      setTimeout(() => {
        refetch();
      }, 0);
    }
  }, 150);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [firstCol, setFirstCol] = useState<IPostWithHashtags[]>([]);
  const [secondCol, setSecondCol] = useState<IPostWithHashtags[]>([]);
  const [thirdCol, setThirdCol] = useState<IPostWithHashtags[]>([]);

  const [scrollY, setScrollY] = useRecoilState(mainPageScrollYState);

  const isBackToMain = useRecoilValue(isBackToMainState);

  const clickedProfile = () => {
    setScrollY(window.scrollY);
  };

  const clickedPost = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const firstColImages: IPostWithHashtags[] = [];
    const secondColImages: IPostWithHashtags[] = [];
    const thirdColImages: IPostWithHashtags[] = [];

    if (isMobile) {
      if (data?.postsData && Array.isArray(data?.postsData)) {
        data?.postsData.forEach((post: IPostWithHashtags, index: number) => {
          firstColImages.push(post);
        });
      }
    }

    if (isTabletOrLaptop) {
      if (data?.postsData && Array.isArray(data?.postsData)) {
        data?.postsData.forEach((post: IPostWithHashtags, index: number) => {
          if (index % 2 === 0) {
            firstColImages.push(post);
          } else if (index % 2 === 1) {
            secondColImages.push(post);
          }
        });
      }
    }

    if (isDesktop) {
      if (data?.postsData && Array.isArray(data?.postsData)) {
        data?.postsData.forEach((post: IPostWithHashtags, index: number) => {
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
  }, [data, isMobile, isTabletOrLaptop, isDesktop]);

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

  useInitSearch();

  return (
    <Container>
      {isMobile && (
        <ColumnsContainer
          $isMobile={String(isMobile)}
          $isTabletOrLaptop={String(isTabletOrLaptop)}
          $isDesktop={String(isDesktop)}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
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
          $isMobile={String(isMobile)}
          $isTabletOrLaptop={String(isTabletOrLaptop)}
          $isDesktop={String(isDesktop)}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
          $isMobile={String(isMobile)}
          $isTabletOrLaptop={String(isTabletOrLaptop)}
          $isDesktop={String(isDesktop)}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
                <ImagesBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
                    />
                  </StyledLink>
                  <ProfileContainer $isMobile={String(isMobile)}>
                    <ProfileBox $isMobile={String(isMobile)}>
                      <ProfileLink
                        to={`/user/${post.owner.username}`}
                        state={path}
                        onClick={clickedProfile}
                        $isMobile={String(isMobile)}>
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
