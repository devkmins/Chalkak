import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { Link } from "react-router-dom";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import styled from "styled-components";
import Header from "../pages/Header";
import { RiImage2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";

const Container = styled.div``;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 100px;
`;

const ProfileImg = styled.img`
  width: 175px;
  height: 175px;
  border-radius: 50%;
`;

const ProfileName = styled.span`
  margin-top: 20px;
  font-size: 32px;
  font-weight: 700;
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20%;
  margin-top: 20px;
`;

const TotalViews = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #767676;
`;

const TotalLikes = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #767676;
`;

const EditProfileLink = styled(Link)`
  margin-top: 20px;
  border: 1px solid #a39e9e;
  border-radius: 15px;
  padding: 15px 40px;
  color: #767676;
  cursor: pointer;

  &:hover {
    color: black;
    border-color: black;
  }
`;

const PostsContainer = styled.div`
  width: 100%;
  margin-top: 50px;
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

const ContentsContainer = styled.div`
  display: flex;
  align-items: center;
  color: #6b6565;
  font-weight: 600;
  padding-left: 25px;
  border-bottom: 1px solid #d1d1d1;
`;

const PhotoBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  cursor: pointer;

  &:hover {
    color: black;
    border-bottom: 1.5px solid black;
  }

  span {
    margin-top: 2.5px;
  }
`;

const StyledRiImage2Fill = styled(RiImage2Fill)`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  max-height: max-content;
`;

const PostProfileContainer = styled.div`
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

const PostProfileImg = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 32.5px;
  height: 32.5px;
`;

const PostBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 25px;

  &:hover {
    ${PostProfileContainer} {
      display: flex;
    }
  }
`;

function UserPage() {
  const location = useLocation();
  const username = location.state;

  const sessionData = useRecoilValue(sessionState);

  const { data } = useQuery("data", () =>
    axios
      .get(`http://localhost:4000/user/${username}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
  );

  let totalViews = 0;
  let totalLikes = 0;

  data?.userPosts?.posts?.map((post: any) => (totalViews += post.views - 1));
  data?.userPosts?.posts?.map((post: any) => (totalLikes += post.likes.length));

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  useEffect(() => {
    const firstColImages: string[] = [];
    const secondColImages: string[] = [];
    const thirdColImages: string[] = [];

    if (data && Array.isArray(data?.userPosts?.posts)) {
      data?.userPosts?.posts.forEach((post: any, index: any) => {
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

  return (
    <Container>
      <Header />
      <ProfileContainer>
        {data && (
          <>
            <ProfileImg
              key={data?.profileImg}
              alt=""
              src={
                data?.profileImg
                  ? `http://localhost:4000/${data?.profileImg}`
                  : defaultUserProfileImg
              }
            />
            <ProfileName>{data.userPosts.name}</ProfileName>
            <TotalBox>
              <TotalViews>조회 수 {totalViews}</TotalViews>
              <TotalLikes>좋아요 수 {totalLikes}</TotalLikes>
            </TotalBox>
            {sessionData.username === username && (
              <EditProfileLink to={"/account"}>프로필 편집</EditProfileLink>
            )}
            <PostsContainer>
              <ContentsContainer>
                <PhotoBox>
                  <StyledRiImage2Fill />
                  <span>사진 {data.userPosts.posts.length}</span>
                </PhotoBox>
              </ContentsContainer>
              <PostsBox>
                <ColumnsContainer>
                  <ImagesContainer>
                    {firstCol &&
                      firstCol.map((post) => (
                        <PostBox key={post?._id}>
                          <StyledLink
                            to={`/post/${post?.title}`}
                            state={post?._id}>
                            <Image
                              src={`http://localhost:4000/${post.fileUrl[0].path}`}
                              alt=""
                            />
                          </StyledLink>
                          <PostProfileContainer>
                            <ProfileBox>
                              <ProfileLink
                                to={`/user/${post.owner.username}`}
                                state={post.owner.username}>
                                <PostProfileImg
                                  src={`http://localhost:4000/${post.owner.profileImage}`}
                                  alt=""
                                />
                                {post.owner.name}
                              </ProfileLink>
                            </ProfileBox>
                          </PostProfileContainer>
                        </PostBox>
                      ))}
                  </ImagesContainer>
                  <ImagesContainer>
                    {secondCol &&
                      secondCol.map((post) => (
                        <PostBox key={post?._id}>
                          <StyledLink
                            to={`/post/${post?.title}`}
                            state={post?._id}>
                            <Image
                              src={`http://localhost:4000/${post.fileUrl[0].path}`}
                              alt=""
                            />
                          </StyledLink>
                          <PostProfileContainer>
                            <ProfileBox>
                              <PostProfileImg
                                src={`http://localhost:4000/${post.owner.profileImage}`}
                                alt=""
                              />
                              <ProfileLink
                                to={`/user/${post.owner.username}`}
                                state={post.owner.username}>
                                {post.owner.name}
                              </ProfileLink>
                            </ProfileBox>
                          </PostProfileContainer>
                        </PostBox>
                      ))}
                  </ImagesContainer>
                  <ImagesContainer>
                    {thirdCol &&
                      thirdCol.map((post) => (
                        <PostBox key={post?._id}>
                          <StyledLink
                            to={`/post/${post?.title}`}
                            state={post?._id}>
                            <Image
                              src={`http://localhost:4000/${post.fileUrl[0].path}`}
                              alt=""
                            />
                          </StyledLink>
                          <PostProfileContainer>
                            <ProfileBox>
                              <PostProfileImg
                                src={`http://localhost:4000/${post.owner.profileImage}`}
                                alt=""
                              />
                              <ProfileLink
                                to={`/user/${post.owner.username}`}
                                state={post.owner.username}>
                                {post.owner.name}
                              </ProfileLink>
                            </ProfileBox>
                          </PostProfileContainer>
                        </PostBox>
                      ))}
                  </ImagesContainer>
                </ColumnsContainer>
              </PostsBox>
            </PostsContainer>
          </>
        )}
      </ProfileContainer>
    </Container>
  );
}

export default UserPage;
