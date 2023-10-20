// Libraries
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ReactModal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Package
import { styled } from "styled-components";

// Atoms
import { currentPostState } from "../atoms/currentPostAtoms";
import { currentSearchState } from "../atoms/searchStateAtoms";
import { isEditedState } from "../atoms/postEditedAtom";
import { loggedInState } from "../atoms/authAtoms";
import { sessionState } from "../atoms/sessionAtom";

// React
import { useEffect, useState } from "react";

// Components
import Header from "./Header";
import PostSettings from "./PostSettings";
import NotificationBar from "./NotificationBar";
import SimilarPosts from "./SimilarPosts";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Types
import { IImage } from "../types/detailImageType";
import { IRatioTypes } from "../types/ratioType";

// Constants
import { PHOTO_UPDATE_SUCCESS_TEXT } from "../constants/notificationMessages";
import { SEARCH_PATH, USER_PATH } from "../constants/paths";
import { DETAIL_POST_DATA } from "../constants/reactQueryKeys";

// React-Icons
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { BsPerson } from "@react-icons/all-files/bs/BsPerson";
import { MdDateRange } from "@react-icons/all-files/md/MdDateRange";
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";

// Styles
import {
  A_LITTLE_DARK_GRAY_COLOR,
  BLACK_COLOR,
  BS_THREE_DOTS_COLOR,
  GR_FORM_CLOSE_COLOR,
  HEART_CLICKED_COLOR,
  HEART_UNCLICKED_COLOR,
  NORMAL_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Hooks
import useScrollToTop from "../hooks/useScrollToTop";
import usePopStateEvent from "../hooks/usePopStateEvent";

interface StyledAiFillHeartProps {
  clicked: string;
}

const Container = styled.div``;

const Box = styled.div`
  margin: 0px 25px;
  padding-top: 85px;
  padding-bottom: 25px;
`;

const NestedBox = styled.div`
  height: fit-content;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 47.5px;
  height: 47.5px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
`;

const PostSettingsContainer = styled.div``;

const StyledBsThreeDots = styled(BsThreeDots)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: ${BS_THREE_DOTS_COLOR};

  &:hover {
    color: ${BLACK_COLOR};
  }
`;

const StyledReactModal = styled(ReactModal)``;

const StyledGrFormClose = styled(GrFormClose)`
  position: absolute;
  margin-top: 70px;
  margin-left: 5px;
  width: 35px;
  height: 35px;
  cursor: pointer;

  path {
    stroke: ${GR_FORM_CLOSE_COLOR};

    &:hover {
      stroke: ${WHITE_COLOR};
    }
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const ImagesBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  width: 90vh;
`;

const Image = styled.img<IRatioTypes>`
  object-fit: contain;
  max-height: 100vh;
  aspect-ratio: ${(props) => props.$ratioWidth} /
    ${(props) => props.$ratioHeight};
`;

const ContentContainer = styled.div`
  margin-top: 50px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const Title = styled.span`
  font-size: 21.5px;
  font-weight: 700;
  margin-bottom: 12.5px;
  color: ${A_LITTLE_DARK_GRAY_COLOR};
`;

const Description = styled.span`
  width: 50%;
  line-break: anywhere;
  line-height: 1.5;
  font-size: 15px;
  color: ${A_LITTLE_DARK_GRAY_COLOR};
`;

const InfoBox = styled.div`
  display: grid;
  grid-row-gap: 10px;
  margin-bottom: 25px;

  span {
    color: ${NORMAL_GRAY_COLOR};
  }
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 10px;
  }
`;

const StyledMdDateRange = styled(MdDateRange)`
  width: 17.5px;
  height: 17.5px;
  color: ${NORMAL_GRAY_COLOR};
`;

const ViewsBox = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 10px;
  }
`;

const StyledBsPerson = styled(BsPerson)`
  width: 17.5px;
  height: 17.5px;
  color: ${NORMAL_GRAY_COLOR};
`;

const HashtagsList = styled.div`
  flex-wrap: wrap;
  margin-top: 25px;
  margin-bottom: 10px;
  white-space: nowrap;
`;

const Hashtag = styled.span`
  width: min-content;
  border: 1px solid ${NORMAL_GRAY_COLOR};
  border-radius: 7.5px;
  padding: 10px 20px;
  color: ${NORMAL_GRAY_COLOR};
  font-size: 13.5px;
  margin-right: 12.5px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    color: black;
  }
`;

const LikesBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;
  width: max-content;

  span {
    font-size: 16px;
    margin-left: 5px;
  }
`;

const StyledAiFillHeart = styled(AiFillHeart)<StyledAiFillHeartProps>`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
  cursor: pointer;
  color: ${(props) =>
    props.clicked === "true" ? HEART_CLICKED_COLOR : HEART_UNCLICKED_COLOR};
`;

const SimilarPostsBox = styled.div`
  padding-top: 25px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const SimilarPostsText = styled.span`
  margin-left: 25px;
  font-size: 18px;
  font-weight: 600;
`;

const CustomArrow = styled.div`
  display: block;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
  border-radius: 50%;
  font-size: 18px;
`;

const LeftArrow = ({ currentSlide, slideCount, ...props }: any) => {
  return <CustomArrow {...props}>{"<"}</CustomArrow>;
};

const RightArrow = ({ currentSlide, slideCount, ...props }: any) => {
  return <CustomArrow {...props}>{">"}</CustomArrow>;
};

const StyledLeftArrow = styled(LeftArrow)`
  left: 10px;
`;

const StyledRightArrow = styled(RightArrow)`
  right: 10px;
`;

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  touchMove: true,
  adaptiveHeight: true,
  prevArrow: <StyledLeftArrow>{"<"}</StyledLeftArrow>,
  nextArrow: <StyledRightArrow>{">"}</StyledRightArrow>,
};

ReactModal.setAppElement("#root");

function DetailPost() {
  const { data } = useQuery(DETAIL_POST_DATA, () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const queryClient = useQueryClient();

  const scrollToTop = useScrollToTop();

  const sessionData = useRecoilValue(sessionState);
  const loggedIn = useRecoilValue(loggedInState);

  const setCurrentSearch = useSetRecoilState(currentSearchState);

  const [isEdited, setIsEdited] = useRecoilState(isEditedState);

  const setCurrentPost = useSetRecoilState(currentPostState);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [clickLikes, setClickLikes] = useState(
    data?.likes?.includes(sessionData._id)
  );

  const [likes, setLikes] = useState(data?.likes?.length);

  const location = useLocation();
  const postId = location.state.postId;
  const prevPath = location.state.path;

  const goBack = usePopStateEvent(prevPath);

  const navigate = useNavigate();

  const userProfileImg = data?.owner?.profileImage;

  const date = new Date(data?.createdAt);
  const yearArray = date.toLocaleDateString().split(".");
  yearArray.pop();
  const labelArray = ["년", "월", "일"];
  const combinedArray = Array.from(
    { length: Math.min(yearArray.length, labelArray.length) },
    (_, index) => {
      return yearArray[index] + labelArray[index];
    }
  );
  const resultDate = combinedArray.join("");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const requestViews = async (views: number) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/post/${postId}/views`,
        { views },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const likesBtn = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/post/${postId}/likes`,
        "",
        { withCredentials: true }
      );

      setClickLikes(!clickLikes);
      setLikes(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  const hashtagClicked = async (hashtag: string) => {
    const response = await axios.get(
      `http://localhost:4000/search/${hashtag}`,
      { withCredentials: true }
    );

    setCurrentSearch(hashtag);
    navigate(`${SEARCH_PATH}/${hashtag}`, { state: response.data });
  };

  useEffect(() => {
    if (data?.views) {
      const views = Number(data.views) + 1;
      requestViews(views);
    }
  }, [data?.views]);

  useEffect(() => {
    setClickLikes(data?.likes?.includes(sessionData._id));
    setLikes(data?.likes?.length);
  }, [data]);

  useEffect(() => {
    if (isEdited) {
      queryClient.invalidateQueries("getPostDetailData");
    }
  }, [isEdited]);

  useEffect(() => {
    setTimeout(() => setIsEdited(false), 3000);
  }, [isEdited]);

  useEffect(() => {
    setCurrentPost(postId);
  }, [postId]);

  return (
    <>
      {isEdited && <NotificationBar text={PHOTO_UPDATE_SUCCESS_TEXT} />}
      <Container>
        <Header />
        <Box>
          <NestedBox>
            <ProfileContainer>
              <ProfileBox>
                <Link to={`${USER_PATH}/${data?.owner?.username}`}>
                  <ProfileImg
                    alt="유저의 프로필 이미지"
                    src={
                      userProfileImg
                        ? `http://localhost:4000/${userProfileImg}`
                        : defaultUserProfileImg
                    }
                  />
                </Link>
                <Link to={`${USER_PATH}/${data?.owner?.username}`}>
                  <ProfileName>{data?.owner?.name}</ProfileName>
                </Link>
              </ProfileBox>
              {sessionData._id === data?.owner?._id && (
                <PostSettingsContainer>
                  <StyledBsThreeDots onClick={openModal} />
                  <StyledReactModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}>
                    <StyledGrFormClose onClick={closeModal} />
                    <PostSettings postId={data?._id} data={data} />
                  </StyledReactModal>
                </PostSettingsContainer>
              )}
            </ProfileContainer>
            {data && (
              <div key={data?._id}>
                <ImagesContainer>
                  <ImagesBox>
                    <StyledSlider {...sliderSettings}>
                      {data?.fileUrl?.map((img: IImage, index: number) => (
                        <Image
                          key={img.path}
                          alt={`${data.title}-${
                            data.description
                          }-${Date.now()}`}
                          src={`http://localhost:4000/${img.path}`}
                          $ratioWidth={data.ratioWidth[index]}
                          $ratioHeight={data.ratioHeight[index]}
                        />
                      ))}
                    </StyledSlider>
                  </ImagesBox>
                </ImagesContainer>
                <ContentContainer>
                  <ContentBox>
                    <Title>{data?.title}</Title>
                    <Description>{data?.description}</Description>
                  </ContentBox>
                  <InfoBox>
                    <DateBox>
                      <StyledMdDateRange />
                      <span>{resultDate}에 게시됨</span>
                    </DateBox>
                    <ViewsBox>
                      <StyledBsPerson />
                      <span>{data?.views}회 조회</span>
                    </ViewsBox>
                  </InfoBox>
                  <HashtagsList>
                    {data?.hashtags &&
                      data?.hashtags?.map((hashtag: string) => (
                        <Hashtag
                          onClick={() => hashtagClicked(hashtag)}
                          key={hashtag + `${Math.random()}`}>
                          {hashtag}
                        </Hashtag>
                      ))}
                  </HashtagsList>
                  <LikesBox>
                    {loggedIn ? (
                      <StyledAiFillHeart
                        clicked={String(clickLikes)}
                        onClick={likesBtn}></StyledAiFillHeart>
                    ) : (
                      <StyledAiFillHeart clicked={String(clickLikes)} />
                    )}
                    <span>{likes}</span>
                  </LikesBox>
                </ContentContainer>
              </div>
            )}
          </NestedBox>
        </Box>
        <SimilarPostsBox>
          <SimilarPostsText>관련 사진</SimilarPostsText>
          <SimilarPosts title={data?.title} postId={data?._id} />
        </SimilarPostsBox>
      </Container>
    </>
  );
}

export default DetailPost;
