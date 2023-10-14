import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { IImage } from "../types/detailImageType";

interface IDeletePostProp {
  postId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImagesBox = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 50px;
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
  background-color: #fdf6f4;
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
  border: 1px solid #df4927;
  border-radius: 10px;
  background-color: white;
  color: #df4927;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: #df4927;
    color: white;
  }
`;

function DeletePost({ postId }: IDeletePostProp) {
  const navigate = useNavigate();

  const { data } = useQuery("getData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const onClick = async () => {
    const result = window.confirm("사진을 정말 제거하실 건가요?");

    if (result) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/post/${postId}/delete`,
          { withCredentials: true }
        );

        navigate("/");
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
