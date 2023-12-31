// Libraries
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { motion } from "framer-motion";

// Package
import { styled } from "styled-components";

// React
import { useState } from "react";

// Component
import Header from "../components/Header";

// Atom
import { sessionState } from "../atoms/sessionAtom";

// Hooks
import useSearchClear from "../hooks/useSearchClear";
import useScrollToTop from "../hooks/useScrollToTop";

// Styles
import { useMobile } from "../styles/mediaQueries";
import {
  A_LITTLE_DARK_GRAY_COLOR,
  BLACK_COLOR,
  GRAY_COLOR,
  LIGHT_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// React-Icons
import { BsBoxArrowInLeft } from "@react-icons/all-files/bs/BsBoxArrowInLeft";
import { MdClear } from "@react-icons/all-files/md/MdClear";
import { BsCardImage } from "@react-icons/all-files/bs/BsCardImage";

// Util
import {
  ContainerVariants,
  DotTransition,
  DotVariants,
} from "../utils/framerMotion";
import { resizeAndConvertToWebP } from "../utils/resizeAndConvertToWebP";

// Constant
import { CLOSE_CONFIRMATION_MESSAGE } from "../constants/confirmationMessages";
import { USER_PATH } from "../constants/paths";

// Api
import { postApi } from "../apis/post";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface imgResizeFuncResultType {
  blob: File;
  ratioWidth: number;
  ratioHeight: number;
}

const SubmittedBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SubmittedText = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-top: 25px;
`;

const Container = styled.div``;

const BackBtnBox = styled.div<IIsMobile>`
  display: flex;
  padding-top: 75px;
  margin: 0px 0px 10px 15px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    justify-content: flex-end;
    margin: 0px 10px 10px 0px;
    `}
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
  width: 75%;
  height: 50vh;
  border: 2px dashed ${LIGHT_GRAY_COLOR};

  ${(props) =>
    props.$isMobile === "true" &&
    `
    width: 95%;
    height: 70vh;
    `}
`;

const DropzoneBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledBsCardImage = styled(BsCardImage)`
  color: #383434;
`;

const DropZoneText = styled.p<IIsMobile>`
  font-size: ${(props) => (props.$isMobile === "true" ? "16px" : "28px")};
  font-weight: 700;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 15px;
  padding: 0px 25px;
`;

const InfoText = styled.span`
  color: ${A_LITTLE_DARK_GRAY_COLOR};
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const ImageLengthText = styled.span`
  color: ${GRAY_COLOR};
  font-size: 14px;
  font-weight: 500;
`;

const ImagesContainer = styled.div<IIsMobile>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: auto;
  grid-gap: 15px;
  justify-content: center;
  width: 75%;
  border-top: 1px solid black;
  margin-top: 50px;
  padding-top: 50px;
  padding-bottom: 35px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    width: 90%;
    grid-template-columns: repeat(4, 1fr);
    `}
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
  background-color: ${BLACK_COLOR};
  color: ${WHITE_COLOR};
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
    background-color: ${BLACK_COLOR};
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
  height: 75px;
  border: none;
  border-top: 1px solid ${A_LITTLE_DARK_GRAY_COLOR};
  border-bottom: 1px solid ${A_LITTLE_DARK_GRAY_COLOR};
  font-size: 35px;
  font-weight: 300;
  padding-left: 10px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    height: 65px;
    font-size: 28px;
    `}
`;

const DescriptionTextArea = styled.textarea<IIsMobile>`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-top: 25px;
  height: 275px;
  font-size: 18px;
  font-weight: 300;
  text-align: left;
  padding-top: 10px;
  padding-bottom: 225px;
  padding-left: 10px;
  line-height: 25px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    height: 200px;
    font-size: 16px;
    padding-bottom: 150px;
    `}
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
  border: 1px solid ${GRAY_COLOR};
  width: min-content;
  margin-right: 15px;
  margin-bottom: 10px;
  color: ${GRAY_COLOR};
  font-weight: 300;
`;

const Btn = styled.button`
  margin-top: 25px;
  height: 50px;
  color: ${WHITE_COLOR};
  background-color: ${BLACK_COLOR};
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
  color: ${WHITE_COLOR};
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
    background-color: ${GRAY_COLOR};
  }
`;

const LoadingDot = {
  display: "block",
  width: "2rem",
  height: "2rem",
  backgroundColor: "black",
  borderRadius: "50%",
};

const LoadingContainer = {
  width: "10rem",
  height: "5rem",
  display: "flex",
  justifyContent: "space-around",
};

function UploadImage() {
  const searchKeywordsClear = useSearchClear();

  const scrollToTop = useScrollToTop();

  const sessionData = useRecoilValue(sessionState);

  const [images, setImages] = useState<File[]>([]);
  const [data, setData] = useState<string[]>([]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: [],
  });

  const navigate = useNavigate();

  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  const handleBackBtn = () => {
    if (images.length > 0) {
      const result = window.confirm(CLOSE_CONFIRMATION_MESSAGE);

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

  const onDrop = (acceptedFiles: File[]) => {
    if (images.length < 10) {
      acceptedFiles.forEach((img: File) => {
        const url = URL.createObjectURL(img);

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

  const handleSubmit = async (event: React.FormEvent) => {
    setIsSubmitted(true);
    event.preventDefault();

    if (images.length > 0) {
      const imagesFormData = new FormData();

      let ratioWidth = [];
      let ratioHeight = [];

      for (const img of images) {
        try {
          const result = (await resizeAndConvertToWebP(
            img
          )) as imgResizeFuncResultType;
          const imgFile = result.blob;

          ratioWidth.push(result.ratioWidth);
          ratioHeight.push(result.ratioHeight);

          imagesFormData.append("images", imgFile);
        } catch (error) {
          console.error("이미지 변환 오류:", error);
        }
      }

      try {
        const responseImages = await postApi.postUploadImage(imagesFormData);

        const files = responseImages.data;

        const responseForm = await postApi.postCreatePost(
          formData,
          files,
          ratioWidth,
          ratioHeight
        );

        setTimeout(() => setIsSubmitted(false), 1500);

        navigate(`${USER_PATH}/${sessionData.username}`, {
          state: sessionData.username,
        });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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

  return (
    <>
      {isSubmitted && (
        <SubmittedBox>
          <div
            style={{
              paddingTop: "5rem",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <motion.div
              style={LoadingContainer}
              variants={ContainerVariants}
              initial="initial"
              animate="animate">
              <motion.span
                style={LoadingDot}
                variants={DotVariants}
                transition={DotTransition}
              />
              <motion.span
                style={LoadingDot}
                variants={DotVariants}
                transition={DotTransition}
              />
              <motion.span
                style={LoadingDot}
                variants={DotVariants}
                transition={DotTransition}
              />
            </motion.div>
          </div>
          <SubmittedText>
            이미지가 업로드 중입니다. 잠시만 기다려 주세요.
          </SubmittedText>
        </SubmittedBox>
      )}
      {!isSubmitted && (
        <>
          <Container>
            <Header />
            <BackBtnBox $isMobile={isMobileString}>
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
                      <DropzoneSection $isMobile={isMobileString}>
                        <DropzoneBox {...getRootProps()}>
                          <input {...getInputProps()} />
                          <StyledBsCardImage size={100} />
                          <DropZoneText $isMobile={isMobileString}>
                            최대 10개의 이미지를 끌어다 놓거나 찾아보기로 선택해
                            보세요!
                          </DropZoneText>
                          <InfoText>
                            (첫 번째로 선택한 이미지가 메인 이미지가 되어요!)
                          </InfoText>
                          <ImageLengthText>
                            이미지 최대 {10 - data.length}개 추가 가능
                          </ImageLengthText>
                        </DropzoneBox>
                      </DropzoneSection>
                    )}
                  </Dropzone>
                </UploadBox>
                <ImagesContainer $isMobile={isMobileString}>
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
          {images?.length > 0 && (
            <CreateBox>
              <CreateForm onSubmit={handleSubmit} $isMobile={isMobileString}>
                <TitleInput
                  type="title"
                  name="title"
                  placeholder="제목"
                  value={formData.title}
                  maxLength={75}
                  required
                  onChange={handleChange}
                  $isMobile={isMobileString}
                />
                <DescriptionTextArea
                  name="description"
                  placeholder="사진에 대한 설명을 작성해 보세요."
                  value={formData.description}
                  maxLength={150}
                  onChange={handleChange}
                  $isMobile={isMobileString}
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
      )}
    </>
  );
}

export default UploadImage;
