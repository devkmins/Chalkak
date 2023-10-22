// Libraries
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";

// Package
import { styled } from "styled-components";

// Atoms
import {
  currentSearchState,
  recentSearchState,
} from "../atoms/searchStateAtoms";

// React
import { useRef, useState } from "react";

// Component
import RecentSearch from "./RecentSearch";

// React-Icons
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";

// Constants
import { SEARCH_PATH } from "../constants/paths";
import { RECENT_SEARCH_KEYWORDS_LOCAL_KEY } from "../constants/storagesKeys";

// Style
import { useMobile } from "../styles/mediaQueries";

// Hook
import useClickOutside from "../hooks/useClickOutside";
import { GRAY_COLOR, LIGHT_GRAY_COLOR } from "../constants/colors";

// Util
import { setLocalStorageItem } from "../utils/localStorage";

const Box = styled.div``;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 15px;
  background-color: #eeeeee;
  border: 1px solid #e1e1e1;
  transition: background-color 0.25s;

  &:hover {
    border-color: ${LIGHT_GRAY_COLOR};
  }

  &:focus-within {
    background-color: white;
    border-color: ${LIGHT_GRAY_COLOR};
  }
`;

const SearchIcon = styled(BiSearch)`
  width: 22.5px;
  height: 22.5px;
  margin: 0px 15px 0px 10px;
  color: ${GRAY_COLOR};
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
  const [currentSearch, setCurrentSearch] = useRecoilState(currentSearchState);
  const setKeywords = useSetRecoilState(recentSearchState);

  const [formData, setFormData] = useState({
    keyword: "",
  });

  const [focus, setFocus] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  const clickOutside = useClickOutside(searchRef, () => setFocus(false));

  const navigate = useNavigate();

  const isMobile = useMobile();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setKeywords((prev: string[]) => {
      const prevKeywords = [...prev];

      if (!prevKeywords?.includes(formData.keyword)) {
        const newKeywords = [formData.keyword, ...prevKeywords];

        if (newKeywords.length > 5) {
          newKeywords.pop();
        }

        setLocalStorageItem(
          RECENT_SEARCH_KEYWORDS_LOCAL_KEY,
          JSON.stringify(newKeywords)
        );

        return newKeywords;
      } else {
        return prevKeywords;
      }
    });

    setCurrentSearch(formData.keyword);
    navigate(`${SEARCH_PATH}/${formData.keyword}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setCurrentSearch(value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <Box onFocus={handleFocus} ref={searchRef}>
      <SearchForm onSubmit={handleSubmit}>
        <SearchIcon />
        <SearchInput
          name="keyword"
          onChange={handleChange}
          value={currentSearch}
          placeholder="Chalkak 검색"
          type="text"
          alt=""
        />
      </SearchForm>
      {focus && !isMobile && <RecentSearch />}
    </Box>
  );
}

export default SearchPost;
