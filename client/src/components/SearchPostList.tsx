import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../pages/Header";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { useEffect, useState } from "react";
import { RiImage2Fill } from "@react-icons/all-files/ri/RiImage2Fill";
import NoSearchResults from "./NoSearchResults";
import { useQuery } from "react-query";
import axios from "axios";
import { debounce } from "lodash";
import { useRecoilState } from "recoil";
import {
  isBackToSearchPostListState,
  searchPostListScrollYState,
} from "../atoms";
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";

interface IIsMobile {
  $isMobile: string;
}

interface IColumnsContainerProps {
  $isMobile: string;
  $isTabletOrLaptop: string;
  $isDesktop: string;
}

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

const ColumnsContainer = styled.div<IColumnsContainerProps>`
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

const Image = styled.img`
  width: 100%;
  max-height: max-content;
  object-fit: contain;
`;

const ProfileContainer = styled.div<IIsMobile>`
  display: ${(props) => (props.$isMobile === "true" ? "flex" : "none")};
  position: ${(props) => (props.$isMobile === "true" ? "" : "absolute")};
  bottom: 0;
  width: max-content;
  height: max-content;
  margin-bottom: ${(props) =>
    props.$isMobile === "true" ? "12.5px" : "17.5px"};
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
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  const params = useParams();
  const searchKeyword = params.keyword;

  const location = useLocation();
  const path = location.pathname;

  const [page, setPage] = useState(1);

  const { data, refetch, isFetching, isLoading } = useQuery(
    "getSearchPostList",
    async () => {
      const response = await axios.get(
        `http://localhost:4000/search/${searchKeyword}?page=${page}`,
        { withCredentials: true }
      );
      const responseData = response.data;

      return responseData;
    }
  );

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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  useEffect(() => {
    const firstColImages: any[] = [];
    const secondColImages: any[] = [];
    const thirdColImages: any[] = [];

    if (isMobile) {
      if (data?.posts && Array.isArray(data?.posts)) {
        data?.posts?.forEach((post: any, index: any) => {
          firstColImages.push(post);
        });
      }
    }

    if (isTabletOrLaptop) {
      if (data?.posts && Array.isArray(data?.posts)) {
        data?.posts?.forEach((post: any, index: any) => {
          if (index % 2 === 0) {
            firstColImages.push(post);
          } else if (index % 2 === 1) {
            secondColImages.push(post);
          }
        });
      }
    }

    if (isDesktop) {
      if (data?.posts && Array.isArray(data?.posts)) {
        data?.posts?.forEach((post: any, index: any) => {
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

  const [scrollY, setScrollY] = useRecoilState(searchPostListScrollYState);

  const [isBackToSearchPostList, setIsBackToSearchPostList] = useRecoilState(
    isBackToSearchPostListState
  );

  const clickedProfile = () => {
    setScrollY(window.scrollY);
  };

  const clickedPost = () => {
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
                    $isMobile={String(isMobile)}
                    $isTabletOrLaptop={String(isTabletOrLaptop)}
                    $isDesktop={String(isDesktop)}>
                    <ImagesContainer>
                      {firstCol &&
                        firstCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                          </PostBox>
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
                        firstCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {secondCol &&
                        secondCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
                          </PostBox>
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
                        firstCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {secondCol &&
                        secondCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
                          </PostBox>
                        ))}
                    </ImagesContainer>
                    <ImagesContainer>
                      {thirdCol &&
                        thirdCol.map((post) => (
                          <PostBox key={post?._id} $isMobile={String(isMobile)}>
                            <StyledLink
                              to={`/post/${post?.title}`}
                              state={{ postId: post?._id, path }}
                              onClick={clickedPost}>
                              <Image
                                src={`http://localhost:4000/${post.fileUrl[0].path}`}
                                alt=""
                              />
                            </StyledLink>
                            <ProfileContainer $isMobile={String(isMobile)}>
                              <ProfileBox $isMobile={String(isMobile)}>
                                <ProfileLink
                                  to={`/user/${post.owner.username}`}
                                  state={path}
                                  onClick={clickedProfile}
                                  $isMobile={String(isMobile)}>
                                  <PostProfileImg
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
          <NoSearchResults posts={data} searchWord={searchKeyword} />
        </Container>
      )}
    </>
  );
}

export default SearchPostList;
