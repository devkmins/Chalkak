import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Prop {
  postId: string;
}

function CreatePost({ postId }: Prop) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="title"
          name="title"
          placeholder="title"
          value={formData.title}
          maxLength={75}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={formData.description}
          maxLength={150}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="hashtags"
          placeholder="hashtags"
          value={formData.hashtags}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreatePost;
