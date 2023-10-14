// Libraries
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useQuery } from "react-query";

// Package
import { styled } from "styled-components";

// React
import { useState } from "react";

// Atom
import { isEditedState } from "../atoms/postEditedAtom";

// Constant
import { POST_TITLE_VALIDITY_ERROR } from "../constants/errorMessages";

interface IEditPostProp {
  postId: string;
}

interface IError {
  titleError: string;
}

interface IFormDataProps {
  title: string;
  description: string;
  hashtags: string[];
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 100%;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

const TitleInput = styled.input`
  margin-top: 5px;
  height: 40px;
  font-size: 15px;
`;

const DescriptionTextArea = styled.textarea`
  margin-top: 5px;
  margin-bottom: 25px;
  height: 120px;
  font-size: 15px;
`;

const HashtagsInput = styled.input`
  margin-top: 5px;
  margin-bottom: 25px;
  height: 40px;
  font-size: 15px;
`;

const HashtagsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  white-space: nowrap;
  margin-bottom: 15px;
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

const RemoveButton = styled.button`
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

  &:hover ${RemoveButton} {
    opacity: 1;
    background-color: #8c8c8c;
  }
`;

const Btn = styled.button`
  width: 100%;
  height: 40px;
  color: white;
  background-color: black;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;

const ErrorMessage = styled.span`
  margin-top: 7.5px;
  font-size: 13px;
  color: #ff6b6b;
`;

function EditPost({ postId }: IEditPostProp) {
  const { data } = useQuery("getPostEditData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const [formData, setFormData] = useState({
    title: data?.title.trim() || "",
    description: data?.description.trim() || "",
    hashtags: data?.hashtags || [],
  });

  const [error, setError] = useState<IError>();

  const setIsEdited = useSetRecoilState(isEditedState);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (formData.title === "") {
      setError((prevError) => ({
        titleError: POST_TITLE_VALIDITY_ERROR,
      }));

      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/post/${postId}/edit`,
        formData,
        { withCredentials: true }
      );

      setIsEdited(true);
    } catch (error) {
      console.error("Error:", error);
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

    setError({
      titleError: "",
    });
  };

  const handleHashtagsEnter = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const { value } = event.target;

      if (value !== "" && value.trim()) {
        if (formData.hashtags.length < 5) {
          setFormData((prev: IFormDataProps) => {
            return { ...prev, hashtags: [...prev.hashtags, value.trim()] };
          });
        }

        event.target.value = "";
      }
    }
  };

  const removeClick = (hashtag: string) => {
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
      <Form onSubmit={handleSubmit}>
        <TitleBox>
          <span>제목</span>
          <TitleInput
            type="title"
            name="title"
            value={formData.title}
            maxLength={75}
            onChange={handleChange}
          />
          {error && error.titleError && (
            <ErrorMessage>{error.titleError}</ErrorMessage>
          )}
        </TitleBox>
        <span>설명</span>
        <DescriptionTextArea
          name="description"
          value={formData.description}
          maxLength={150}
          onChange={handleChange}
        />
        <span>해시태그</span>
        <HashtagsInput
          type="text"
          name="hashtags"
          onKeyDown={handleHashtagsEnter}
        />
        <HashtagsBox>
          {formData.hashtags &&
            formData.hashtags.map((hashtag: string) => (
              <Hashtags key={hashtag + Math.random()}>
                <Hashtag>{hashtag}</Hashtag>
                <RemoveButton onClick={() => removeClick(hashtag)}>
                  X
                </RemoveButton>
              </Hashtags>
            ))}
        </HashtagsBox>
        <Btn type="submit">업데이트</Btn>
      </Form>
    </>
  );
}

export default EditPost;
