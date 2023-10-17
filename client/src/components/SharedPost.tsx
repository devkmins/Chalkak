// Asset
import defaultUserProfileImg from "../assets/Images/defaultProfile.webp";

// Constants
import { POST_PATH, USER_PATH } from "../constants/paths";

// Styles
import { useMobile } from "../styles/mediaQueries";
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

interface SharedPostProps {
  column: any;
  path: string;
  handleClickRememberScroll: () => void;
}

function SharedPost({
  column,
  path,
  handleClickRememberScroll,
}: SharedPostProps) {
  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  return (
    <ImagesContainer>
      {column &&
        column.map((post: any, index: number) => (
          <PostBox key={post?._id} $isMobile={isMobileString}>
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
          </PostBox>
        ))}
    </ImagesContainer>
  );
}

export default SharedPost;
