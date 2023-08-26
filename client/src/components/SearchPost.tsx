import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
  const searchRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleDocumentClick = (event: any) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocus(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div onFocus={handleFocus} ref={searchRef}>
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
      {focus && <RecentSearch />}
    </div>
  );
}

export default SearchPost;
