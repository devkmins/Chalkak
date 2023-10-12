import { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { styled } from "styled-components";
import Header from "../pages/Header";
import useInitSearch from "../hooks/useInitSearch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { BsBoxArrowInLeft } from "@react-icons/all-files/bs/BsBoxArrowInLeft";
import { MdClear } from "@react-icons/all-files/md/MdClear";
import { resizeAndConvertToWebP } from "../resizeAndConvertToWebP";
import { useMobile } from "../styles/mediaQueries";
import { BsCardImage } from "@react-icons/all-files/bs/BsCardImage";

interface imgResizeFuncResultType {
  blob: File;
  ratioWidth: number;
  ratioHeight: number;
}

interface IIsMobile {
  $isMobile: string;
}

const Container = styled.div``;

const BackBtnBox = styled.div<IIsMobile>`
  display: flex;
  justify-content: ${(props) =>
    props.$isMobile === "true" ? "flex-end" : "none"};
  padding-top: 75px;
  margin: 0px ${(props) => (props.$isMobile === "true" ? "10px" : "0px")} 10px
    ${(props) => (props.$isMobile === "true" ? "0px" : "15px")};
`;

const StyledBsBoxArrowInLeft = styled(BsBoxArrowInLeft)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: #514d4d;
`;

const StyledMdClear = styled(MdClear)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  color: #514d4d;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DropzoneSection = styled.section<IIsMobile>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.$isMobile === "true" ? "95%" : "75%")};
  height: ${(props) => (props.$isMobile === "true" ? "70vh" : "50vh")};
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

const StyledBsCardImage = styled(BsCardImage)`
  color: #383434;
`;

const DropZoneText = styled.p<IIsMobile>`
  font-size: ${(props) => (props.$isMobile === "true" ? "16px" : "28px")};
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 0px 25px;
`;

const ImagesContainer = styled.div<IIsMobile>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isMobile === "true" ? "repeat(4, 1fr)" : "repeat(5, 1fr)"};
  grid-auto-rows: auto;
  grid-gap: 15px;
  justify-content: center;
  width: ${(props) => (props.$isMobile === "true" ? "90%" : "75%")};
  border-top: 1px solid black;
  margin-top: 50px;

  padding-top: 50px;
  padding-bottom: 35px;
`;

const ImagesBox = styled.div`
  margin-bottom: 15px;
  position: relative;

  &:hover {
    opacity: 0.875;
  }
`;

const Image = styled.img`
  width: 100%;
  max-height: max-content;
`;

const RemoveButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #2b2e2c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  line-height: 25px;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
    background-color: black;
  }

  ${ImagesBox}:hover & {
    opacity: 0.75;
  }
`;

const CreateBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const CreateForm = styled.form<IIsMobile>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.$isMobile === "true" ? "90%" : "75%")};

  input {
    display: flex;
    align-items: flex-start;
  }
`;

const TitleInput = styled.input<IIsMobile>`
  height: ${(props) => (props.$isMobile === "true" ? "65px" : "75px")};
  border: none;
  border-top: 1px solid #4f4f4f;
  border-bottom: 1px solid #4f4f4f;
  font-size: ${(props) => (props.$isMobile === "true" ? "28px" : "35px")};
  font-weight: 300;
  padding-left: 10px;
`;

const DescriptionTextArea = styled.textarea<IIsMobile>`
  margin-top: 25px;
  height: ${(props) => (props.$isMobile === "true" ? "200px" : "275px")};
  font-size: ${(props) => (props.$isMobile === "true" ? "16px" : "18px")};
  font-weight: 300;
  text-align: left;
  padding-top: 10px;
  padding-bottom: ${(props) =>
    props.$isMobile === "true" ? "150px" : "225px"};
  padding-left: 10px;
  line-height: 25px;
`;

const HashtagsContainer = styled.div``;

const HashtagsInput = styled.input`
  width: 100%;
  margin-top: 25px;
  height: 50px;
  font-size: 14px;
  padding-left: 10px;
  font-weight: 300;
`;

const HashtagsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  margin-top: 10px;
`;

const Hashtag = styled.div`
  padding: 10px 25px;
  border-radius: 7.5px;
  border: 1px solid #767676;
  width: min-content;
  margin-right: 15px;
  margin-bottom: 10px;
  color: #8c8c8c;
  font-weight: 300;
`;

const Btn = styled.button`
  margin-top: 25px;
  height: 50px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RemoveHashtagButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1px;
  right: 15px;
  color: white;
  border: none;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  line-height: 15px;
  font-size: 10px;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
`;

const Hashtags = styled.div`
  position: relative;

  &:hover ${RemoveHashtagButton} {
    opacity: 1;
    background-color: #8c8c8c;
  }
`;

function UploadImage() {
  const isMobile = useMobile();

  const [images, setImages] = useState<File[]>([]);
  const [data, setData] = useState<string[]>([]);

  const navigate = useNavigate();

  const sessionData = useRecoilValue(sessionState);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: [],
  });

  const handleBackBtn = () => {
    if (images.length > 0) {
      const result = window.confirm(
        "모든 업로드가 취소됩니다. 정말로 닫으시겠습니까?"
      );

      if (result) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const removeImgClick = (img: string) => {
    setData((prev) => {
      const newData = [...prev];
      const index = newData.indexOf(String(img));
      newData.splice(index, 1);

      return newData;
    });

    setImages((prev) => {
      const newImages = [...prev];
      const index = data.findIndex((value) => value === img);
      newImages.splice(index, 1);

      return newImages;
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

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (images.length > 0) {
      const imagesFormData = new FormData();
      let ratioWidth;
      let ratioHeight;

      for (const img of images) {
        try {
          const result = (await resizeAndConvertToWebP(
            img
          )) as imgResizeFuncResultType;
          const imgFile = result.blob;

          ratioWidth = result.ratioWidth;
          ratioHeight = result.ratioHeight;

          imagesFormData.append("images", imgFile);
        } catch (error) {
          console.error("이미지 변환 오류:", error);
        }
      }

      try {
        const responseImages = await axios.post(
          "http://localhost:4000/post/upload/images",
          imagesFormData,
          { withCredentials: true }
        );

        const files = responseImages.data;

        const responseForm = await axios.post(
          "http://localhost:4000/post/upload",
          { formData, files, ratio: { ratioWidth, ratioHeight } },
          { withCredentials: true }
        );

        navigate(`/user/${sessionData.username}`, {
          state: sessionData.username,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleHashtagsEnter = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const { value } = event.target;

      if (value !== "" && value.trim()) {
        if (formData.hashtags.length < 5) {
          setFormData((prev: any) => {
            return { ...prev, hashtags: [...prev.hashtags, value.trim()] };
          });
        }

        event.target.value = "";
      }
    }
  };

  const removeHashtagClick = (hashtag: string) => {
    setFormData((prev: any) => {
      const newHashtags: string[] = [...prev.hashtags];
      const index = newHashtags.indexOf(hashtag);
      newHashtags.splice(index, 1);

      const newFormData = { ...prev, hashtags: newHashtags };

      return newFormData;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useInitSearch();

  return (
    <>
      <Container>
        <Header />
        <BackBtnBox $isMobile={String(isMobile)}>
          {isMobile ? (
            <StyledMdClear onClick={handleBackBtn} />
          ) : (
            <StyledBsBoxArrowInLeft onClick={handleBackBtn} />
          )}
        </BackBtnBox>
        <UploadContainer>
          <>
            <UploadBox>
              <Dropzone
                maxFiles={10}
                maxSize={150000000}
                accept={{ "image/*": [".png", ".jpeg", ".jpg", ".webp"] }}
                onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                  <DropzoneSection $isMobile={String(isMobile)}>
                    <DropzoneBox {...getRootProps()}>
                      <input {...getInputProps()} />
                      <StyledBsCardImage size={100} />
                      <DropZoneText $isMobile={String(isMobile)}>
                        최대 10개의 이미지를 끌어다 놓거나 찾아보기로 선택해
                        보세요!
                      </DropZoneText>
                      <span>이미지 최대 {10 - data.length}개 추가 가능</span>
                    </DropzoneBox>
                  </DropzoneSection>
                )}
              </Dropzone>
            </UploadBox>
            <ImagesContainer $isMobile={String(isMobile)}>
              {data &&
                data.map((img) => (
                  <ImagesBox key={img}>
                    <Image src={img} alt="" />
                    <RemoveButton onClick={() => removeImgClick(img)}>
                      X
                    </RemoveButton>
                  </ImagesBox>
                ))}
            </ImagesContainer>
          </>
        </UploadContainer>
      </Container>
      {images.length > 0 && (
        <CreateBox>
          <CreateForm onSubmit={handleSubmit} $isMobile={String(isMobile)}>
            <TitleInput
              type="title"
              name="title"
              placeholder="제목"
              value={formData.title}
              maxLength={75}
              required
              onChange={handleChange}
              $isMobile={String(isMobile)}
            />
            <DescriptionTextArea
              name="description"
              placeholder="사진에 대한 설명을 작성해 보세요."
              value={formData.description}
              maxLength={150}
              onChange={handleChange}
              $isMobile={String(isMobile)}
            />
            <HashtagsContainer>
              <HashtagsInput
                type="text"
                name="hashtags"
                placeholder="추가하고 싶은 해시태그를 입력해 보세요."
                onKeyDown={handleHashtagsEnter}
              />
              <HashtagsBox>
                {formData.hashtags &&
                  formData.hashtags.map((hashtag) => (
                    <Hashtags key={hashtag + Math.random()}>
                      <Hashtag>{hashtag}</Hashtag>
                      <RemoveHashtagButton
                        onClick={() => removeHashtagClick(hashtag)}>
                        X
                      </RemoveHashtagButton>
                    </Hashtags>
                  ))}
              </HashtagsBox>
            </HashtagsContainer>
            <Btn onClick={handleSubmit} type="submit">
              {data.length} 사진 제출
            </Btn>
          </CreateForm>
        </CreateBox>
      )}
    </>
  );
}

export default UploadImage;
