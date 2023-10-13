import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import defaultUserProfileImg from "../assets/User/default-profile.webp";
import { useSetRecoilState } from "recoil";
import { isBackToUserPageState, userPageScrollYState } from "../atoms";
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

interface imageComponentProps {
  $ratioWidth: number;
  $ratioHeight: number;
}

interface IPost {
  _id: string;
  title: string;
  description: string;
  fileUrl: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }[];
  hashtags: string[];
  owner: {
    _id: string;
    name: string;
    username: string;
    profileImage: string;
  };
  views: number;
  likes: string[];
  ratioWidth: number[];
  ratioHeight: number[];
  createdAt: string;
  __v: number;
}

interface IUserData {
  _id: string;
  name: string;
  username: string;
  profileImage: string;
  posts: IPost[];
}

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

const PostsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
`;

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

const Image = styled.img<imageComponentProps>`
  width: 100%;
  max-height: max-content;
  aspect-ratio: ${(props) => props.$ratioWidth} /
    ${(props) => props.$ratioHeight};
`;

const ProfileContainer = styled.div<IIsMobile>`
  display: none;
  position: absolute;
  bottom: 0;
  width: max-content;
  height: max-content;
  margin-bottom: 17.5px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    display: flex;
    position: static;
    margin-bottom: 12.5px;
    `}
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

function UserLikes({ data }: { data: IUserData }) {
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  const location = useLocation();
  const path = location.pathname;

  const setIsBackToUserPage = useSetRecoilState(isBackToUserPageState);

  const setScrollY = useSetRecoilState(userPageScrollYState);

  const clickedProfile = () => {
    setScrollY(window.scrollY);
  };

  const clickedPost = () => {
    setScrollY(window.scrollY);
  };

  const [firstCol, setFirstCol] = useState<IPost[]>([]);
  const [secondCol, setSecondCol] = useState<IPost[]>([]);
  const [thirdCol, setThirdCol] = useState<IPost[]>([]);

  useEffect(() => {
    const firstColImages: IPost[] = [];
    const secondColImages: IPost[] = [];
    const thirdColImages: IPost[] = [];

    if (isMobile) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          firstColImages.push(post);
        });
      }
    }

    if (isTabletOrLaptop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          if (index % 2 === 0) {
            firstColImages.push(post);
          } else if (index % 2 === 1) {
            secondColImages.push(post);
          }
        });
      }
    }

    if (isDesktop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
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

  console.log(firstCol);

  useEffect(() => {
    const handleNavigation = () => {
      setIsBackToUserPage(true);
      setTimeout(() => setIsBackToUserPage(false), 500);

      return () => {
        window.removeEventListener("popstate", handleNavigation);
      };
    };

    window.addEventListener("popstate", handleNavigation);
  });

  return (
    <PostsBox>
      {isMobile && (
        <ColumnsContainer
          $isMobile={String(isMobile)}
          $isTabletOrLaptop={String(isTabletOrLaptop)}
          $isDesktop={String(isDesktop)}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post, index) => (
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
                          alt="유저의 프로필 이미지"
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
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
              firstCol.map((post, index) => (
                <PostBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
                          alt="유저의 프로필 이미지"
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
              secondCol.map((post, index) => (
                <PostBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
                          alt="유저의 프로필 이미지"
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
              firstCol.map((post, index) => (
                <PostBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
                          alt="유저의 프로필 이미지"
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
              secondCol.map((post, index) => (
                <PostBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
                          alt="유저의 프로필 이미지"
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
              thirdCol.map((post, index) => (
                <PostBox key={post?._id} $isMobile={String(isMobile)}>
                  <StyledLink
                    to={`/post/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={clickedPost}>
                    <Image
                      src={`http://localhost:4000/${post.fileUrl[0].path}`}
                      alt={`${post.title}-${post.description}-${Date.now()}`}
                      $ratioWidth={post.ratioWidth[0]}
                      $ratioHeight={post.ratioHeight[0]}
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
                          alt="유저의 프로필 이미지"
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
  );
}

export default UserLikes;
