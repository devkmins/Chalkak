import axios from "axios";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { useRecoilState } from "recoil";
import {
  currentPostPageState,
  isBackToMainState,
  mainPageScrollYState,
} from "../atoms";
import useInitSearch from "../hooks/useInitSearch";
import React from "react";
import { debounce } from "lodash";

interface imageComponentProps {
  $ratioWidth: number;
  $ratioHeight: number;
}

const Container = styled.div`
  width: 100%;
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 31.5%);
  grid-auto-rows: auto;
  grid-gap: 25px;
  justify-content: center;
  padding: 0px 15px;
  padding-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
  }
`;

const ImagesContainer = styled.div``;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img<imageComponentProps>`
  width: 100%;
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
  color: #e0dfdf;
  font-size: 16px;

  &:hover {
    color: white;
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

function Posts() {
  const [page, setPage] = useRecoilState(currentPostPageState);

  const { data, refetch, isFetching } = useQuery(
    "getAllPostsData",
    async () => {
      const response = await axios.get(
        `http://localhost:4000/posts?page=${page}`
      );
      const responseData = response.data;

      return responseData;
    }
  );

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

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  const [scrollY, setScrollY] = useRecoilState(mainPageScrollYState);

  const [isBackToMain, setIsBackToMain] = useRecoilState(isBackToMainState);

  const clickedProfile = () => {
    setScrollY(window.scrollY);
  };

  const clickedPost = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    const firstColImages: any[] = [];
    const secondColImages: any[] = [];
    const thirdColImages: any[] = [];

    if (data?.postsData && Array.isArray(data?.postsData)) {
      data?.postsData.forEach((post: any, index: number) => {
        if (index % 3 === 0) {
          firstColImages.push(post);
        } else if (index % 3 === 1) {
          secondColImages.push(post);
        } else if (index % 3 === 2) {
          thirdColImages.push(post);
        }
      });
    }

    setFirstCol(firstColImages);
    setSecondCol(secondColImages);
    setThirdCol(thirdColImages);
  }, [data]);

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
      <ColumnsContainer>
        <ImagesContainer>
          {firstCol &&
            firstCol.map((post) => (
              <ImagesBox key={post?._id}>
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                    $ratioWidth={post.ratioWidth}
                    $ratioHeight={post.ratioHeight}
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
                      <ProfileImg
                        src={
                          post.owner.profileImage
                            ? `http://localhost:4000/${post.owner.profileImage}`
                            : defaultUserProfileImg
                        }
                        alt=""
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
            secondCol.map((post) => (
              <ImagesBox key={post?._id}>
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                    $ratioWidth={post.ratioWidth}
                    $ratioHeight={post.ratioHeight}
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
                      <ProfileImg
                        src={
                          post.owner.profileImage
                            ? `http://localhost:4000/${post.owner.profileImage}`
                            : defaultUserProfileImg
                        }
                        alt=""
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
            thirdCol.map((post) => (
              <ImagesBox key={post?._id}>
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                    $ratioWidth={post.ratioWidth}
                    $ratioHeight={post.ratioHeight}
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
                      <ProfileImg
                        src={
                          post.owner.profileImage
                            ? `http://localhost:4000/${post.owner.profileImage}`
                            : defaultUserProfileImg
                        }
                        alt=""
                      />
                      {post.owner.name}
                    </ProfileLink>
                  </ProfileBox>
                </ProfileContainer>
              </ImagesBox>
            ))}
        </ImagesContainer>
      </ColumnsContainer>
    </Container>
  );
}

export default Posts;
