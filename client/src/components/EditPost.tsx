import axios from "axios";
import { useState } from "react";

function EditPost({ postId }: any) {
  const [edit, setEdit] = useState(false);

  const onClick = () => {
    setEdit((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:4000/post/${postId}/edit`,
        formData
      );
    } catch (error) {
      console.error("Error:", error);
    }

    onClick();
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
      {edit ? (
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
      ) : (
        <h4 onClick={onClick}>Edit</h4>
      )}
    </>
  );
}

export default EditPost;
