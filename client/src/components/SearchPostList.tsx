import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../pages/Header";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import { useEffect, useState } from "react";
import { RiImage2Fill } from "react-icons/ri";

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

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 31.5%);
  grid-auto-rows: auto;
  grid-gap: 25px;
  justify-content: center;
  padding: 0px 15px;
  padding-top: 50px;
  width: 100%;

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
  object-fit: contain;
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

function SearchPostList() {
  const location = useLocation();
  const posts = location.state;

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  useEffect(() => {
    const firstColImages: string[] = [];
    const secondColImages: string[] = [];
    const thirdColImages: string[] = [];

    if (posts && Array.isArray(posts)) {
      posts?.forEach((post: any, index: any) => {
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
  }, [posts]);

  return (
    <Container>
      <Header />
      <Box>
        <PostsContainer>
          <ContentsContainer>
            <PhotoBox>
              <StyledRiImage2Fill />
              <span>사진 {posts?.length}</span>
            </PhotoBox>
          </ContentsContainer>
          <PostsBox>
            <ColumnsContainer>
              <ImagesContainer>
                {firstCol &&
                  firstCol.map((post) => (
                    <PostBox key={post?._id}>
                      <StyledLink to={`/post/${post?.title}`} state={post?._id}>
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
                      </PostProfileContainer>
                    </PostBox>
                  ))}
              </ImagesContainer>
              <ImagesContainer>
                {secondCol &&
                  secondCol.map((post) => (
                    <PostBox key={post?._id}>
                      <StyledLink to={`/post/${post?.title}`} state={post?._id}>
                        <Image
                          src={`http://localhost:4000/${post.fileUrl[0].path}`}
                          alt=""
                        />
                      </StyledLink>
                      <PostProfileContainer>
                        <ProfileBox>
                          <PostProfileImg
                            src={
                              post.owner.profileImage
                                ? `http://localhost:4000/${post.owner.profileImage}`
                                : defaultUserProfileImg
                            }
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
                      <StyledLink to={`/post/${post?.title}`} state={post?._id}>
                        <Image
                          src={`http://localhost:4000/${post.fileUrl[0].path}`}
                          alt=""
                        />
                      </StyledLink>
                      <PostProfileContainer>
                        <ProfileBox>
                          <PostProfileImg
                            src={
                              post.owner.profileImage
                                ? `http://localhost:4000/${post.owner.profileImage}`
                                : defaultUserProfileImg
                            }
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
      </Box>
    </Container>
  );
}

export default SearchPostList;
