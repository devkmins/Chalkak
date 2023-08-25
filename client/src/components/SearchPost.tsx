import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchPost() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    keyword: "",
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await axios.get(
      `http://localhost:4000/search/${formData.keyword}`,
      { withCredentials: true }
    );

    navigate(`/search/${formData.keyword}`, { state: response.data });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="keyword"
        onChange={handleChange}
        value={formData.keyword}
        placeholder="검색하기"
        type="text"
        alt=""
      />
    </form>
  );
}

export default SearchPost;
