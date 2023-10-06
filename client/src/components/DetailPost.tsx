import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentPostState,
  currentSearchState,
  isBackToMainState,
  isBackToSearchPostListState,
  isBackToSimilarPostsState,
  isEditedState,
  loggedInState,
  sessionState,
} from "../atoms";
import { useEffect, useState } from "react";
import Header from "../pages/Header";
import { styled } from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { AiFillHeart } from "react-icons/ai";
import { BsThreeDots, BsPerson } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { IconBaseProps } from "react-icons";
import PostSettings from "./PostSettings";
import ReactModal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import useBackToMain from "../hooks/useBackToMain";
import NotificationBar from "./NotificationBar";
import SimilarPosts from "./SimilarPosts";

interface StyledAiFillHeartProps extends IconBaseProps {
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
  color: #8c8888;

  &:hover {
    color: black;
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
    stroke: #f2efef;

    &:hover {
      stroke: white;
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

const Image = styled.img`
  object-fit: contain;
  max-height: 100vh;
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
  color: #4d4d4d;
`;

const Description = styled.span`
  width: 50%;
  line-break: anywhere;
  line-height: 1.5;
  font-size: 15px;
  color: #4d4d4d;
  font-family: "NanumGothic";
`;

const InfoBox = styled.div`
  display: grid;
  grid-row-gap: 10px;
  margin-bottom: 25px;

  span {
    color: #767676;
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
  color: #767676;
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
  color: #767676;
`;

const HashtagsList = styled.div`
  flex-wrap: wrap;
  margin-top: 25px;
  margin-bottom: 10px;
  white-space: nowrap;
`;

const Hashtag = styled.span`
  width: min-content;
  border: 1px solid #8c8c8c;
  border-radius: 7.5px;
  padding: 10px 20px;
  color: #8c8c8c;
  font-size: 13.5px;
  font-family: "NanumGothic";
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
  color: ${(props) => (props.clicked === "true" ? "#ff6b6b" : "#576574")};
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
  const { data } = useQuery("getPostDataDetail", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const location = useLocation();
  const postId = location.state.postId;
  const prevPath = location.state.path;

  const setIsBackToMain = useSetRecoilState(isBackToMainState);
  const setIsBackToSimilarPosts = useSetRecoilState(isBackToSimilarPostsState);
  const setIsBackToSearchPostList = useSetRecoilState(
    isBackToSearchPostListState
  );

  const navigate = useNavigate();

  const sessionData = useRecoilValue(sessionState);
  const loggedIn = useRecoilValue(loggedInState);

  const setCurrentSearch = useSetRecoilState(currentSearchState);

  const [modalIsOpen, setIsOpen] = useState(false);

  const [isEdited, setIsEdited] = useRecoilState(isEditedState);

  const setCurrentPost = useSetRecoilState(currentPostState);

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {};

  const closeModal = () => {
    setIsOpen(false);
  };

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

  useEffect(() => {
    if (data?.views) {
      const views = Number(data.views) + 1;
      requestViews(views);
    }
  }, [data?.views]);

  const [clickLikes, setClickLikes] = useState(
    data?.likes?.includes(sessionData._id)
  );

  const [likes, setLikes] = useState(data?.likes?.length);

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

  useEffect(() => {
    setClickLikes(data?.likes?.includes(sessionData._id));
    setLikes(data?.likes?.length);
  }, [data]);

  const hashtagClicked = async (hashtag: string) => {
    const response = await axios.get(
      `http://localhost:4000/search/${hashtag}`,
      { withCredentials: true }
    );

    setCurrentSearch(hashtag);

    navigate(`/search/${hashtag}`, { state: response.data });
  };

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
    if (isEdited) {
      queryClient.invalidateQueries("getPostDataDetail");
    }
  }, [isEdited]);

  const updatedText = "사진이 업데이트 되었습니다.";

  useEffect(() => {
    setTimeout(() => setIsEdited(false), 3000);
  }, [isEdited]);

  useEffect(() => {
    setCurrentPost(postId);
  }, [postId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isEdited && <NotificationBar text={updatedText} />}
      <Container>
        <Header />
        <Box>
          <NestedBox>
            <ProfileContainer>
              <ProfileBox>
                <Link to={`/user/${data?.owner?.username}`}>
                  <ProfileImg
                    alt=""
                    src={
                      userProfileImg
                        ? `http://localhost:4000/${userProfileImg}`
                        : defaultUserProfileImg
                    }
                  />
                </Link>
                <Link to={`/user/${data?.owner?.username}`}>
                  <ProfileName>{data?.owner?.name}</ProfileName>
                </Link>
              </ProfileBox>
              {sessionData._id === data?.owner?._id && (
                <PostSettingsContainer>
                  <StyledBsThreeDots onClick={openModal} />
                  <StyledReactModal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}>
                    <StyledGrFormClose onClick={closeModal} />
                    <PostSettings postId={data?._id} />
                  </StyledReactModal>
                </PostSettingsContainer>
              )}
            </ProfileContainer>
            {data && (
              <div key={data?._id}>
                <ImagesContainer>
                  <ImagesBox>
                    <StyledSlider {...sliderSettings}>
                      {data?.fileUrl?.map((img: any, index: number) => (
                        <Image
                          key={img.path}
                          alt={`Image ${index + 1}`}
                          src={`http://localhost:4000/${img.path}`}
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
