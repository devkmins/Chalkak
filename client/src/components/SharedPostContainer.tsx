// Package
import styled from "styled-components";

// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Constants
import { POST_PATH, USER_PATH } from "../constants/paths";

// Hook
import useSplitPosts from "../hooks/useSplitPosts";

// Styles
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";
import {
  Image,
  ImagesContainer,
  PostBox,
  PostProfileImg,
  ProfileBox,
  ProfileContainer,
  ProfileLink,
  StyledLink,
} from "../styles/post";
import SharedPost from "./SharedPost";

// Type
import { IMediaQueriresType } from "../types/mediaQueriesType";

interface PostsContainerProps {
  data: any;
  path: string;
  handleClickRememberScroll: () => void;
  componentName: string;
}

const Container = styled.div`
  width: 100%;
`;

const ColumnsContainer = styled.div<IMediaQueriresType>`
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

function SharedPostContainer({
  data,
  path,
  handleClickRememberScroll,
  componentName,
}: PostsContainerProps) {
  const { firstCol, secondCol, thirdCol } = useSplitPosts(data);

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

  return (
    <Container>
      {isMobile && (
        <ColumnsContainer
          $isMobile={isMobileString}
          $isTabletOrLaptop={isTabletOrLaptopString}
          $isDesktop={isDesktopString}>
          <ImagesContainer>
            {firstCol &&
              firstCol.map((post: any, index: number) => (
                <PostBox key={post?._id} $isMobile={isMobileString}>
                  <ProfileContainer $isMobile={isMobileString}>
                    <ProfileBox $isMobile={isMobileString}>
                      <ProfileLink
                        to={`${USER_PATH}/${post.owner.username}`}
                        state={path}
                        onClick={handleClickRememberScroll}
                        $isMobile={isMobileString}>
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
                    to={`${POST_PATH}/${post?.title}`}
                    state={{ postId: post?._id, path }}
                    onClick={handleClickRememberScroll}>
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
          $isMobile={isMobileString}
          $isTabletOrLaptop={isTabletOrLaptopString}
          $isDesktop={isDesktopString}>
          <SharedPost
            column={firstCol}
            path={path}
            handleClickRememberScroll={handleClickRememberScroll}
          />
          <SharedPost
            column={secondCol}
            path={path}
            handleClickRememberScroll={handleClickRememberScroll}
          />
        </ColumnsContainer>
      )}
      {isDesktop && (
        <ColumnsContainer
          $isMobile={isMobileString}
          $isTabletOrLaptop={isTabletOrLaptopString}
          $isDesktop={isDesktopString}>
          <SharedPost
            column={firstCol}
            path={path}
            handleClickRememberScroll={handleClickRememberScroll}
          />
          <SharedPost
            column={secondCol}
            path={path}
            handleClickRememberScroll={handleClickRememberScroll}
          />
          <SharedPost
            column={thirdCol}
            path={path}
            handleClickRememberScroll={handleClickRememberScroll}
          />
        </ColumnsContainer>
      )}
    </Container>
  );
}

export default SharedPostContainer;
