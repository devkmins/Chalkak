import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentUserPageScrollState,
  currentUserPageState,
  isBackToMainState,
  isBackToSearchPostListState,
  isBackToSimilarPostsState,
  isBackToUserPageState,
  sessionState,
  userPageScrollYState,
} from "../atoms";
import { Link } from "react-router-dom";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import styled from "styled-components";
import Header from "../pages/Header";
import { RiImage2Fill } from "@react-icons/all-files/ri/RiImage2Fill";
import { useEffect, useState } from "react";
import useInitSearch from "../hooks/useInitSearch";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { BsPersonCheck } from "@react-icons/all-files/bs/BsPersonCheck";
import { RiHeartsLine } from "@react-icons/all-files/ri/RiHeartsLine";
import { debounce } from "lodash";
import { useMobile } from "../styles/mediaQueries";
import UserPosts from "./UserPosts";
import UserLikes from "./UserLikes";

interface IPhotoLi {
  connectphotos: string;
}

interface ILikesLi {
  connectlikes: string;
}

interface IIsMobile {
  $isMobile: string;
}

const Container = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const ProfileImg = styled.img<IIsMobile>`
  width: 175px;
  height: 175px;
  border-radius: 50%;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    width: 125px;
    height: 125px;
    `}
`;

const ProfileName = styled.span<IIsMobile>`
  margin-top: 20px;
  font-size: ${(props) => (props.$isMobile === "true" ? "28px" : "32px")};
  font-weight: 700;
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const TotalViews = styled.div<IIsMobile>`
  display: flex;
  align-items: center;
  color: #767676;
  margin-right: 25px;

  span {
    font-size: ${(props) => (props.$isMobile === "true" ? "14px" : "16px")};
    font-weight: 400;
  }
`;

const StyledBsPersonCheck = styled(BsPersonCheck)`
  margin-bottom: 5px;
  margin-right: 4px;
`;

const TotalLikes = styled.div<IIsMobile>`
  display: flex;
  align-items: center;
  color: #767676;

  span {
    font-size: ${(props) => (props.$isMobile === "true" ? "14px" : "16px")};
    font-weight: 400;
  }
`;

const StyledRiHeartsLine = styled(RiHeartsLine)`
  margin-bottom: 4px;
  margin-right: 4px;
`;

const EditProfileLink = styled(Link)<IIsMobile>`
  margin-top: 20px;
  border: 1px solid #a39e9e;
  border-radius: 15px;
  padding: 15px 40px;
  color: #767676;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
  }

  ${(props) =>
    props.$isMobile === "true" &&
    `
    padding: 12.5px 35px;
    border-radius: 12.5px;
    font-size: 14px;
    `}
`;

const PostsContainer = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const ContentsContainer = styled.div<IIsMobile>`
  display: flex;
  font-weight: 600;
  padding-left: ${(props) => (props.$isMobile === "true" ? "10px" : "25px")};
  border-bottom: 1px solid #d1d1d1;
`;

const ContentsUl = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
`;

const PhotoLi = styled.li<IPhotoLi>`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;
  color: ${(props) => (props.connectphotos === "true" ? "black" : "#6b6565")};

  &:hover {
    color: black;
  }
`;

const StyledRiImage2Fill = styled(RiImage2Fill)<IIsMobile>`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-bottom: -6px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    width: 20px;
    height: 20px;
    margin-bottom: -4.5px;
    `}
`;

const LikesLi = styled.li<ILikesLi>`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;
  color: ${(props) => (props.connectlikes === "true" ? "black" : "#6b6565")};

  &:hover {
    color: black;
  }
`;

const StyledAiFillHeart = styled(AiFillHeart)<IIsMobile>`
  width: 25px;
  height: 25px;
  margin-right: 5px;
  margin-bottom: -6px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    width: 20px;
    height: 20px;
    margin-bottom: -4.5px;
    `}
`;

const ContentText = styled.span<IIsMobile>`
  font-size: ${(props) => (props.$isMobile === "true" ? "14px" : "16px")};
  margin-bottom: 10px;
`;

function UserPage() {
  const isMobile = useMobile();

  const location = useLocation();
  const pathname = location.pathname;
  const prevPath = location.state;

  const setIsBackToMain = useSetRecoilState(isBackToMainState);
  const setIsBackToSimilarPosts = useSetRecoilState(isBackToSimilarPostsState);
  const setIsBackToSearchPostList = useSetRecoilState(
    isBackToSearchPostListState
  );

  const params = useParams();
  const username = params.id;

  const [page, setPage] = useRecoilState(currentUserPageScrollState);

  const { data, refetch } = useQuery("getAllUserPostsData", async () => {
    const response = await axios.get(
      `http://localhost:4000/user/${username}?page=${page}`
    );
    const responseData = response.data;

    return responseData;
  });

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

  const [connectPhotos, setConnectPhotos] = useState(true);
  const [connectLikes, setConnectLikes] = useState(false);

  const setCurrentUserPage = useSetRecoilState(currentUserPageState);

  useEffect(() => {
    if (pathname === `/user/${username}`) {
      setConnectPhotos(true);
      setConnectLikes(false);
    } else if (pathname === `/user/${username}/likes`) {
      setConnectPhotos(false);
      setConnectLikes(true);
    }
  }, [pathname]);

  const sessionData = useRecoilValue(sessionState);

  const userProfileImg = data?.profileImg;

  let totalViews = 0;
  let totalLikes = 0;

  data?.userPosts?.posts?.map((post: any) => (totalViews += post.views - 1));
  data?.userPosts?.posts?.map((post: any) => (totalLikes += post.likes.length));

  const scrollY = useRecoilValue(userPageScrollYState);

  const isBackToUserPage = useRecoilValue(isBackToUserPageState);

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

  useEffect(() => {
    if (isBackToUserPage) {
      window.scrollTo(0, scrollY);
    }
  });

  useEffect(() => {
    if (!isBackToUserPage) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (username) {
      setCurrentUserPage(username);
    }
  }, [username]);

  useInitSearch();

  return (
    <Container>
      <Header />
      <ProfileContainer>
        {data && (
          <>
            <ProfileImg
              alt=""
              src={
                userProfileImg
                  ? `http://localhost:4000/${userProfileImg}`
                  : defaultUserProfileImg
              }
              $isMobile={String(isMobile)}
            />
            <ProfileName $isMobile={String(isMobile)}>
              {data?.userPosts?.name}
            </ProfileName>
            <TotalBox>
              <TotalViews $isMobile={String(isMobile)}>
                <StyledBsPersonCheck />
                <span>조회 수 {totalViews}</span>
              </TotalViews>
              <TotalLikes $isMobile={String(isMobile)}>
                <StyledRiHeartsLine />
                <span>좋아요 수 {totalLikes}</span>
              </TotalLikes>
            </TotalBox>
            {sessionData.username === username && (
              <EditProfileLink to={"/account"} $isMobile={String(isMobile)}>
                프로필 편집
              </EditProfileLink>
            )}
            <PostsContainer>
              <ContentsContainer $isMobile={String(isMobile)}>
                <ContentsUl>
                  <PhotoLi connectphotos={String(connectPhotos)}>
                    <Link to={`/user/${username}`} state={username}>
                      <StyledRiImage2Fill $isMobile={String(isMobile)} />
                      <ContentText $isMobile={String(isMobile)}>
                        사진 {data?.length.userPostsLength}
                      </ContentText>
                    </Link>
                  </PhotoLi>
                  <LikesLi connectlikes={String(connectLikes)}>
                    <Link to={`/user/${username}/likes`} state={username}>
                      <StyledAiFillHeart $isMobile={String(isMobile)} />
                      <ContentText $isMobile={String(isMobile)}>
                        좋아요 {data?.length.userLikedLength}
                      </ContentText>
                    </Link>
                  </LikesLi>
                </ContentsUl>
              </ContentsContainer>
              {connectPhotos && <UserPosts data={data?.userPosts} />}
              {connectLikes && <UserLikes data={data?.likedPosts} />}
            </PostsContainer>
          </>
        )}
      </ProfileContainer>
    </Container>
  );
}

export default UserPage;
