import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.png";
import { useEffect, useState } from "react";

interface IProp {
  title: string;
  postId: any;
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
  padding-top: 35px;

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

const Image = styled.img`
  width: 100%;
  max-height: max-content;
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

function SimilarPosts({ title, postId }: IProp) {
  const { data } = useQuery(["getData", title, postId], async () => {
    const response = await axios.get(
      "http://localhost:4000/post/similarPosts",
      {
        params: { postTitle: title, postId },
      }
    );
    return response.data;
  });

  const [firstCol, setFirstCol] = useState<any[]>([]);
  const [secondCol, setSecondCol] = useState<any[]>([]);
  const [thirdCol, setThirdCol] = useState<any[]>([]);

  useEffect(() => {
    const firstColImages: string[] = [];
    const secondColImages: string[] = [];
    const thirdColImages: string[] = [];

    if (data && Array.isArray(data)) {
      data?.forEach((post: any, index: any) => {
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
      <ColumnsContainer>
        <ImagesContainer>
          {firstCol &&
            firstCol.map((post) => (
              <ImagesBox key={post?._id}>
                <StyledLink to={`/post/${post?.title}`} state={post?._id}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink to={`/user/${post.owner.username}`}>
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
                <StyledLink to={`/post/${post?.title}`} state={post?._id}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink to={`/user/${post.owner.username}`}>
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
                <StyledLink to={`/post/${post?.title}`}>
                  <Image
                    src={`http://localhost:4000/${post.fileUrl[0].path}`}
                    alt=""
                  />
                </StyledLink>
                <ProfileContainer>
                  <ProfileBox>
                    <ProfileLink to={`/user/${post.owner.username}`}>
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

export default SimilarPosts;