import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const CreateBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
`;

const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 75%;

  input {
    display: flex;
    align-items: flex-start;
  }
`;

const TitleInput = styled.input`
  height: 75px;
  border: none;
  border-bottom: 1px solid #4f4f4f;
  font-size: 35px;
  font-weight: 300;
  padding-left: 10px;
`;

const DescriptionInput = styled.input`
  margin-top: 25px;
  height: 275px;
  font-size: 18px;
  font-weight: 300;
  text-align: left;
  padding-bottom: 225px;
  padding-left: 10px;
`;

const HashtagsBox = styled.div``;

const HashtagsInput = styled.input`
  width: 100%;
  margin-top: 25px;
  height: 50px;
  font-size: 14px;
  font-weight: 300;
  padding-left: 10px;
`;

const Hashtags = styled.div`
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
  font-family: "NanumGothic";
`;

const Btn = styled.button`
  margin-top: 25px;
  height: 50px;
  color: white;
  background-color: black;
  border: none;
  border-radius: 5px;
`;

function CreatePost({ images }: any) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: [],
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const responseImages = await axios.post(
        "http://localhost:4000/post/upload/images",
        images,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const postId = responseImages.data;

      const responseForm = await axios.post(
        "http://localhost:4000/post/upload",
        { formData, postId },
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
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

      setFormData((prev: any) => {
        return { ...prev, hashtags: [...prev.hashtags, value] };
      });
    }
  };

  return (
    <CreateBox>
      <CreateForm onSubmit={handleSubmit}>
        <TitleInput
          type="title"
          name="title"
          placeholder="제목"
          value={formData.title}
          maxLength={75}
          required
          onChange={handleChange}
        />
        <DescriptionInput
          type="text"
          name="description"
          placeholder="사진에 대한 설명을 작성해 보세요."
          value={formData.description}
          maxLength={150}
          onChange={handleChange}
        />
        <HashtagsBox>
          <HashtagsInput
            type="text"
            name="hashtags"
            placeholder="추가하고 싶은 해시태그를 입력해 보세요."
            onKeyDown={handleHashtagsEnter}
          />
          <Hashtags>
            {formData.hashtags &&
              formData.hashtags.map((hashtag) => <Hashtag>{hashtag}</Hashtag>)}
          </Hashtags>
        </HashtagsBox>
        <Btn type="submit">Submit</Btn>
      </CreateForm>
    </CreateBox>
  );
}

export default CreatePost;
