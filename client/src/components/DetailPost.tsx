import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect, useState } from "react";
import Header from "../pages/Header";
import { css, styled } from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import { AiFillHeart } from "react-icons/ai";
import { BsThreeDots, BsPerson } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { IconBaseProps } from "react-icons";
import PostSettings from "./PostSettings";

interface StyledAiFillHeartProps extends IconBaseProps {
  clicked: boolean;
}

const Container = styled.div``;

const Box = styled.div`
  margin: 0px 75px;
  height: min-content;
  padding-top: 100px;
`;

const NestedBox = styled.div`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: min-content;
  padding: 20px;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 42.5px;
  height: 42.5px;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  font-size: 16px;
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

const PostSettingsBox = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  min-width: max-content;
  min-height: 80px;
  background-color: white;
  border: 1px solid lightgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-top: 2.5px;

  a {
    font-size: 15px;
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
  width: 10%;
`;

const Image = styled.img`
  width: 100%;
  max-height: max-content;
`;

const ContentContainer = styled.div`
  margin-top: 25px;
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
`;

const LikesBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 25px;

  span {
    font-size: 16px;
  }
`;

const StyledAiFillHeart = styled(AiFillHeart)<StyledAiFillHeartProps>`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
  cursor: pointer;
  ${(props) =>
    props.clicked
      ? css`
          color: red;
        `
      : css`
          color: black;
        `};
`;

function DetailPost() {
  const { data } = useQuery("getData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const location = useLocation();
  const postId = location.state;

  const sessionData = useRecoilValue(sessionState);
  const loggedIn = useRecoilValue(loggedInState);

  const [postSettingsClick, setPostSettingsClick] = useState(false);

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

  const onSettingsClick = () => {
    setPostSettingsClick((prev) => !prev);
  };

  /*<PostSettingsBox>
                    <EditPost postId={data?._id} />
                    <DeletePost postId={data?._id} />
                  </PostSettingsBox>*/

  return (
    <Container>
      <Header />
      <Box>
        <NestedBox>
          <ProfileContainer>
            <ProfileBox>
              <ProfileImg
                alt=""
                src={
                  userProfileImg
                    ? `http://localhost:4000/${userProfileImg}`
                    : defaultUserProfileImg
                }
              />
              <ProfileName>{data?.owner?.name}</ProfileName>
            </ProfileBox>
            {sessionData._id === data?.owner?._id && (
              <PostSettingsContainer>
                <StyledBsThreeDots onClick={onSettingsClick} />
                {postSettingsClick && <PostSettings />}
              </PostSettingsContainer>
            )}
          </ProfileContainer>
          {data && (
            <div key={data?._id}>
              <ImagesContainer>
                <ImagesBox>
                  {data?.fileUrl?.map((img: any) => (
                    <Image
                      key={img.path}
                      alt=""
                      src={`http://localhost:4000/${img.path}`}
                    />
                  ))}
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
                      <Hashtag key={hashtag + `${Math.random()}`}>
                        {hashtag}
                      </Hashtag>
                    ))}
                </HashtagsList>
                <LikesBox>
                  {loggedIn && (
                    <StyledAiFillHeart
                      clicked={clickLikes}
                      onClick={likesBtn}></StyledAiFillHeart>
                  )}
                  <span>{likes}</span>
                </LikesBox>
              </ContentContainer>
            </div>
          )}
        </NestedBox>
      </Box>
    </Container>
  );
}

export default DetailPost;
