// Libraries
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation, useParams, Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { debounce } from "lodash";

// Package
import styled from "styled-components";

// React
import { useEffect, useState } from "react";

// Atoms
import { currentUserPageScrollState } from "../atoms/pageScrollAtoms";
import { currentUserPageState } from "../atoms/currentPostAtoms";
import { isBackToUserPageState } from "../atoms/navigationBackAtoms";
import { sessionState } from "../atoms/sessionAtom";
import { userPageScrollYState } from "../atoms/scrollYStateAtoms";

// Components
import Header from "../components/Header";
import UserContents from "../components/UserContents";

// Hooks
import useSearchClear from "../hooks/useSearchClear";
import useScrollEvent from "../hooks/useScrollEvent";
import usePopStateEvent from "../hooks/usePopStateEvent";

// Styles
import { useMobile } from "../styles/mediaQueries";
import { BLACK_COLOR, GRAY_COLOR, LIGHT_GRAY_COLOR } from "../constants/colors";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// React-Icons
import { RiImage2Fill } from "@react-icons/all-files/ri/RiImage2Fill";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { BsPersonCheck } from "@react-icons/all-files/bs/BsPersonCheck";
import { RiHeartsLine } from "@react-icons/all-files/ri/RiHeartsLine";

// Constants
import { ACCOUNT_PATH, USER_PATH } from "../constants/paths";
import { USER_PROFILE_DATA } from "../constants/reactQueryKeys";

// Types
import { IPost } from "../types/postType";
import { IIsMobile } from "../types/mediaQueriesType";

interface IPhotoLi {
  connectphotos: string;
}

interface ILikesLi {
  connectlikes: string;
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
  object-fit: cover;

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
  color: ${GRAY_COLOR};
  margin-right: 25px;

  span {
    font-size: ${(props) => (props.$isMobile === "true" ? "14px" : "16px")};
    font-weight: 400;
  }
`;

const StyledBsPersonCheck = styled(BsPersonCheck)`
  margin-bottom: 1px;
  margin-right: 4px;
`;

const TotalLikes = styled.div<IIsMobile>`
  display: flex;
  align-items: center;
  color: ${GRAY_COLOR};

  span {
    font-size: ${(props) => (props.$isMobile === "true" ? "14px" : "16px")};
    font-weight: 400;
  }
`;

const StyledRiHeartsLine = styled(RiHeartsLine)`
  margin-bottom: 1px;
  margin-right: 4px;
`;

const EditProfileLink = styled(Link)<IIsMobile>`
  margin-top: 20px;
  border: 1px solid #a39e9e;
  border-radius: 15px;
  padding: 15px 40px;
  color: ${GRAY_COLOR};
  font-size: 16px;
  cursor: pointer;

  &:hover {
    color: ${BLACK_COLOR};
    border-color: ${BLACK_COLOR};
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
  border-bottom: 1px solid ${LIGHT_GRAY_COLOR};
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
    color: ${BLACK_COLOR};
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
    color: ${BLACK_COLOR};
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
  const { data, refetch } = useQuery(USER_PROFILE_DATA, async () => {
    const response = await axios.get(
      `http://localhost:4000/user/${username}?page=${page}`
    );
    const responseData = response.data;

    return responseData;
  });

  const searchKeywordsClear = useSearchClear();

  const [page, setPage] = useRecoilState(currentUserPageScrollState);

  const setCurrentUserPage = useSetRecoilState(currentUserPageState);

  const sessionData = useRecoilValue(sessionState);

  const scrollY = useRecoilValue(userPageScrollYState);

  const isBackToUserPage = useRecoilValue(isBackToUserPageState);

  const [connectPhotos, setConnectPhotos] = useState(true);
  const [connectLikes, setConnectLikes] = useState(false);

  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const location = useLocation();
  const pathname = location.pathname;
  const prevPath = location.state;

  const goBack = usePopStateEvent(prevPath);

  const params = useParams();
  const username = params.id;

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const userProfileImg = data?.profileImg;

  const loadMoreData = () => {
    setPage((prev) => prev + 1);
    setTimeout(() => {
      refetch();
    }, 0);
  };

  const scrollEvent = useScrollEvent(loadMoreData);

  useEffect(() => {
    let newTotalViews = 0;
    let newTotalLikes = 0;

    data?.userPosts?.posts?.forEach((post: IPost) => {
      newTotalViews += post.views - 1;
      newTotalLikes += post.likes.length;
    });

    setTotalViews(newTotalViews);
    setTotalLikes(newTotalLikes);
  }, [data]);

  useEffect(() => {
    if (pathname === `${USER_PATH}/${username}`) {
      setConnectPhotos(true);
      setConnectLikes(false);
    } else if (pathname === `${USER_PATH}/${username}/likes`) {
      setConnectPhotos(false);
      setConnectLikes(true);
    }
  }, [pathname]);

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
              $isMobile={isMobileString}
            />
            <ProfileName $isMobile={isMobileString}>
              {data?.userPosts?.name}
            </ProfileName>
            <TotalBox>
              <TotalViews $isMobile={isMobileString}>
                <StyledBsPersonCheck />
                <span>조회 수 {totalViews}</span>
              </TotalViews>
              <TotalLikes $isMobile={isMobileString}>
                <StyledRiHeartsLine />
                <span>좋아요 수 {totalLikes}</span>
              </TotalLikes>
            </TotalBox>
            {sessionData.username === username && (
              <EditProfileLink to={ACCOUNT_PATH} $isMobile={isMobileString}>
                프로필 편집
              </EditProfileLink>
            )}
            <PostsContainer>
              <ContentsContainer $isMobile={isMobileString}>
                <ContentsUl>
                  <PhotoLi connectphotos={String(connectPhotos)}>
                    <Link to={`${USER_PATH}/${username}`} state={username}>
                      <StyledRiImage2Fill $isMobile={isMobileString} />
                      <ContentText $isMobile={isMobileString}>
                        사진 {data?.length.userPostsLength}
                      </ContentText>
                    </Link>
                  </PhotoLi>
                  <LikesLi connectlikes={String(connectLikes)}>
                    <Link
                      to={`${USER_PATH}/${username}/likes`}
                      state={username}>
                      <StyledAiFillHeart $isMobile={isMobileString} />
                      <ContentText $isMobile={isMobileString}>
                        좋아요 {data?.length.userLikedLength}
                      </ContentText>
                    </Link>
                  </LikesLi>
                </ContentsUl>
              </ContentsContainer>
              {connectPhotos && <UserContents data={data?.userPosts?.posts} />}
              {connectLikes && <UserContents data={data?.likedPosts} />}
            </PostsContainer>
          </>
        )}
      </ProfileContainer>
    </Container>
  );
}

export default UserPage;
