import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecentSearch from "./RecentSearch";
import { useSetRecoilState } from "recoil";
import { recentSearchState } from "../atoms";
import { styled } from "styled-components";
import { BiSearch } from "react-icons/bi";

const Box = styled.div``;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 95%;
  height: 40px;
  border-radius: 15px;
  background-color: #eeeeee;
  border: 1px solid #e1e1e1;
  transition: background-color 0.25s;

  &:hover {
    border-color: #cccccc;
  }

  &:focus-within {
    background-color: white;
    border-color: #cccccc;
  }
`;

const SearchIcon = styled(BiSearch)`
  width: 22.5px;
  height: 22.5px;
  margin: 0px 15px 0px 10px;
  color: gray;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 15px;
  background-color: inherit;
  font-size: 14px;
`;

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
    <Box onFocus={handleFocus} ref={searchRef}>
      <SearchForm onSubmit={handleSubmit}>
        <SearchIcon />
        <SearchInput
          name="keyword"
          onChange={handleChange}
          value={formData.keyword}
          placeholder="Chalkak 검색"
          type="text"
          alt=""
        />
      </SearchForm>
      {focus && <RecentSearch />}
    </Box>
  );
}

export default SearchPost;
