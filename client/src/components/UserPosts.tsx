import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { useRecoilState } from "recoil";
import { isBackToUserPageState, userPageScrollYState } from "../atoms";

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

const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
`;

const PostProfileContainer = styled.div`
  display: none;
  position: absolute;
  bottom: 0;
  width: max-content;
  height: max-content;
  margin-bottom: 17.5px;
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
    opacity: 0.875;

    ${PostProfileContainer} {
      display: flex;
    }
  }
`;

function UserPosts({ data }: any) {
  const [scrollY, setScrollY] = useRecoilState(userPageScrollYState);

  const [isBackToUserPage, setIsBackToUserPage] = useRecoilState(
    isBackToUserPageState
  );

  const clickedProfile = () => {
    setScrollY(window.scrollY);
  };

  const clickedPost = () => {
    setScrollY(window.scrollY);
  };

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  useEffect(() => {
    const firstColImages: string[] = [];
    const secondColImages: string[] = [];
    const thirdColImages: string[] = [];

    if (data && Array.isArray(data?.posts)) {
      data?.posts.forEach((post: any, index: any) => {
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
    <PostsBox>
      <ColumnsContainer>
        <ImagesContainer>
          {firstCol &&
            firstCol.map((post) => (
              <PostBox key={post?._id}>
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <PostProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
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
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <PostProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
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
          {thirdCol &&
            thirdCol.map((post) => (
              <PostBox key={post?._id}>
                <StyledLink
                  to={`/post/${post?.title}`}
                  state={post?._id}
                  onClick={clickedPost}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <PostProfileContainer>
                  <ProfileBox>
                    <ProfileLink
                      to={`/user/${post.owner.username}`}
                      onClick={clickedProfile}>
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
      </ColumnsContainer>
    </PostsBox>
  );
}

export default UserPosts;
