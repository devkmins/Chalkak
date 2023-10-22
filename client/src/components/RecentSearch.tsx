// Libraries
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

// Package
import styled from "styled-components";

// Atoms
import {
  currentSearchState,
  recentSearchState,
} from "../atoms/searchStateAtoms";

// Constants
import { SEARCH_PATH } from "../constants/paths";
import { RECENT_SEARCH_KEYWORDS_LOCAL_KEY } from "../constants/storagesKeys";

// Styles
import {
  BLACK_COLOR,
  LIGHT_GRAY_COLOR,
  NORMAL_GRAY_COLOR,
  WHITE_COLOR,
} from "../constants/colors";

// Api
import { globalApi } from "../apis/global";

const RecentSearchBox = styled.div`
  position: absolute;
  width: 50%;
  min-height: 100px;
  height: auto;
  background-color: ${WHITE_COLOR};
  border-radius: 10px;
  border: 0.5px solid ${LIGHT_GRAY_COLOR};
  margin-top: 2.5px;
  padding: 0px 17.5px;
  padding-top: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 14px;
    font-weight: 500;

    &:last-child {
      color: ${NORMAL_GRAY_COLOR};
    }

    &:last-child:hover {
      cursor: pointer;
      color: ${BLACK_COLOR};
    }
  }
`;

const SearchList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  white-space: nowrap;
`;

const SearchText = styled.span`
  width: min-content;
  border: 1px solid ${NORMAL_GRAY_COLOR};
  border-radius: 7.5px;
  padding: 10px 20px;
  color: ${NORMAL_GRAY_COLOR};
  font-size: 13.5px;

  margin-bottom: 10px;
  margin-right: 12.5px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
    color: ${BLACK_COLOR};
  }
`;

function RecentSearch() {
  const [keywords, setKeywords] = useRecoilState(recentSearchState);

  const setCurrentSearch = useSetRecoilState(currentSearchState);

  const navigate = useNavigate();

  const onClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    event?.preventDefault();

    localStorage.removeItem(RECENT_SEARCH_KEYWORDS_LOCAL_KEY);
    setKeywords([]);
  };

  const keywordClicked = async (keyword: string) => {
    const response = await globalApi.getSearchPostsByKeyword(keyword);

    setCurrentSearch(keyword);
    navigate(`${SEARCH_PATH}/${keyword}`, { state: response.data });
  };

  return (
    <RecentSearchBox>
      <Header>
        <span>최근 검색</span>
        <span onClick={onClick}>삭제</span>
      </Header>
      <SearchList>
        {keywords &&
          keywords.map((keyword: string) => (
            <SearchText
              onClick={() => keywordClicked(keyword)}
              key={keyword + `${Math.random()}`}>
              {keyword}
            </SearchText>
          ))}
      </SearchList>
    </RecentSearchBox>
  );
}

export default RecentSearch;
