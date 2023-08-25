import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentSearch from "./RecentSearch";
import { useSetRecoilState } from "recoil";
import { recentSearchState } from "../atoms";

function SearchPost() {
  const navigate = useNavigate();

  const setKeywords = useSetRecoilState(recentSearchState);

  const [formData, setFormData] = useState({
    keyword: "",
  });

  const [focus, setFocus] = useState(false);
  const searchForm = useRef(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await axios.get(
      `http://localhost:4000/search/${formData.keyword}`,
      { withCredentials: true }
    );

    setKeywords((prev: any) => {
      const newKeywords = [...prev, formData.keyword];

      localStorage.setItem("keywords", JSON.stringify(newKeywords));

      return newKeywords;
    });

    navigate(`/search/${formData.keyword}`, { state: response.data });
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  return (
    <form onBlur={handleBlur} onFocus={handleFocus} onSubmit={handleSubmit}>
      <input
        name="keyword"
        onChange={handleChange}
        value={formData.keyword}
        placeholder="검색하기"
        type="text"
        alt=""
      />
      <div>{focus && <RecentSearch />}</div>
    </form>
  );
}

export default SearchPost;
