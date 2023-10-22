// Libraries
import { useNavigate } from "react-router-dom";

// Package
import { styled } from "styled-components";

// Constants
import { PHOTO_REMOVAL_CONFIRMATION } from "../constants/confirmationMessages";
import { MAIN_PATH } from "../constants/paths";

// Style
import {
  DELETE_POST_BTN_COLOR,
  DELETE_POST_TEXT_BOX_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Api
import { postApi } from "../apis/post";

// Type
import { IImage } from "../types/detailImageType";
import { IRatioTypes } from "../types/ratioType";
import { IPostWithHashtags } from "../types/postType";

interface IDeletePostProp {
  postId: string;
  data: IPostWithHashtags;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagesBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0px 15px;
`;

const Image = styled.img<IRatioTypes>`
  aspect-ratio: ${(props) => props.$ratioWidth} /
    ${(props) => props.$ratioHeight};
  height: 50px;
  object-fit: contain;
`;

const TextBox = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  width: 75%;
  height: max-content;
  border-radius: 10px;
  padding: 50px;
  background-color: ${DELETE_POST_TEXT_BOX_COLOR};
`;

const TextSpan = styled.span`
  font-size: 15px;
  font-weight: 700;
`;

const TextPargraph = styled.p`
  margin-top: 15px;
  font-size: 15px;
  line-height: 22.5px;
`;

const RemoveBtn = styled.button`
  width: 50%;
  height: 35px;
  border: none;
  border: 1px solid ${DELETE_POST_BTN_COLOR};
  border-radius: 10px;
  background-color: ${WHITE_COLOR};
  color: ${DELETE_POST_BTN_COLOR};
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${DELETE_POST_BTN_COLOR};
    color: ${WHITE_COLOR};
  }
`;

function DeletePost({ postId, data }: IDeletePostProp) {
  const navigate = useNavigate();

  const onClick = async () => {
    const result = window.confirm(PHOTO_REMOVAL_CONFIRMATION);

    if (result) {
      try {
        const response = await postApi.deletePost(postId);

        navigate(MAIN_PATH);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container>
      <ImagesBox>
        {data?.fileUrl?.map((img: IImage, index: number) => (
          <Image
            key={img.path}
            alt={`Image ${index + 1}`}
            src={`http://localhost:4000/${img.path}`}
            $ratioWidth={data.ratioWidth[index]}
            $ratioHeight={data.ratioHeight[index]}
          />
        ))}
      </ImagesBox>
      <TextBox>
        <TextSpan>
          {data?.owner?.name}님, {data?.fileUrl?.length}개의 사진을 삭제하실 수
          있습니다.
        </TextSpan>
        <TextPargraph>
          사진을 삭제하면 Chalkak에서 다시는 복구할 수 없습니다. 유의사항을
          이해하셨고 사진을 삭제하고 싶으시다면 아래의 버튼을 클릭해 주세요.
        </TextPargraph>
      </TextBox>
      <RemoveBtn onClick={onClick}>이 사진을 삭제하겠습니다.</RemoveBtn>
    </Container>
  );
}

export default DeletePost;
