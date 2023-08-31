import { useState } from "react";
import CreatePost from "./CreatePost";
import Dropzone from "react-dropzone";
import { styled } from "styled-components";
import Header from "../pages/Header";
import { PiImageThin } from "react-icons/pi";

const Container = styled.div``;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DropzoneSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  height: 45vh;
  border: 2px dashed #d4d4d4;
`;

const DropzoneBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  span {
    color: #7a7a7a;
    font-size: 14px;
    font-weight: 500;
  }
`;

const DropZoneText = styled.p`
  font-size: 28px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UploadBtn = styled.button`
  margin-top: 25px;
  border: none;
  border-radius: 5px;
  color: white;
  background-color: black;
  width: 50%;
  height: 45px;

  &:hover {
    cursor: pointer;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-auto-rows: auto;
  border-top: 1.5px solid black;
  width: 75%;
  margin-top: 50px;
  padding-top: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: auto;
  }
`;

const ImagesBox = styled.div``;

const Image = styled.img``;

function UploadImage() {
  const [images, setImages] = useState<File[]>([]);
  const [imagesFormData, setImagesFormData] = useState(new FormData());
  const [data, setData] = useState<string[]>([]);
  const [next, setNext] = useState(false);

  const onClick = async () => {
    if (images.length > 0) {
      setNext(true);

      const formData = new FormData();

      images.forEach((img) => {
        formData.append("images", img);
      });

      setImagesFormData(formData);
    }
  };

  const removeClick = (img: string) => {
    setData((prev) => {
      const newData = [...prev];
      const index = newData.indexOf(String(img));
      newData.splice(index, 1);

      return newData;
    });
  };

  const onDrop = (acceptedFiles: any) => {
    if (images.length < 10) {
      acceptedFiles.forEach((img: any) => {
        const url = URL.createObjectURL(img); // 일시적인 URL이라서 서버에 저장 X, 렌더링하는 용

        setData((prev) => {
          const newUrls = [...prev, url];

          return newUrls;
        });

        setImages((prev) => {
          const newImages = [...prev, img];

          return newImages;
        });
      });
    }
  };

  return (
    <Container>
      <Header />
      <UploadContainer>
        {next ? (
          <CreatePost images={imagesFormData} />
        ) : (
          <>
            <UploadBox>
              <Dropzone
                maxFiles={10}
                maxSize={15000000}
                accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
                onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <DropzoneSection>
                    <DropzoneBox {...getRootProps()}>
                      <input {...getInputProps()} />
                      <PiImageThin size={100} />
                      <DropZoneText>
                        최대 10개의 이미지를 끌어다 놓거나 찾아보기로 선택해
                        보세요!
                      </DropZoneText>
                      <span>이미지 최대 {10 - data.length}개 추가 가능</span>
                    </DropzoneBox>
                  </DropzoneSection>
                )}
              </Dropzone>
              <UploadBtn onClick={onClick}>{data.length} 사진 제출</UploadBtn>
            </UploadBox>
            <ImagesContainer>
              {data
                ? data.map((img) => (
                    <ImagesBox key={img}>
                      <Image src={img} alt="" />
                      <button onClick={() => removeClick(img)}>X</button>
                    </ImagesBox>
                  ))
                : ""}
            </ImagesContainer>
          </>
        )}
      </UploadContainer>
    </Container>
  );
}

export default UploadImage;
