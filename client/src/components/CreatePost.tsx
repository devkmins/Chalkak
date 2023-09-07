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

const HashtagsContainer = styled.div``;

const HashtagsInput = styled.input`
  width: 100%;
  margin-top: 25px;
  height: 50px;
  font-size: 14px;
  font-weight: 300;
  padding-left: 10px;
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
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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

      if (formData.hashtags.length < 5) {
        setFormData((prev: any) => {
          return { ...prev, hashtags: [...prev.hashtags, value] };
        });
      }

      event.target.value = "";
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
                  <RemoveButton onClick={() => removeClick(hashtag)}>
                    X
                  </RemoveButton>
                </Hashtags>
              ))}
          </HashtagsBox>
        </HashtagsContainer>
        <Btn type="submit">Submit</Btn>
      </CreateForm>
    </CreateBox>
  );
}

export default CreatePost;
