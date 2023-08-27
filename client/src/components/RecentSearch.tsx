import { useRecoilState } from "recoil";
import { recentSearchState } from "../atoms";
import styled from "styled-components";

const RecentSearchBox = styled.div`
  position: absolute;
  width: 57.5%;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  border: 0.5px solid #d1d1d1;
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
      color: #767676;
    }

    &:last-child:hover {
      cursor: pointer;
      color: #2f3542;
    }
  }
`;

const SearchList = styled.div`
  margin-top: 25px;
`;

const SearchText = styled.span`
  border: 1px solid #8c8c8c;
  border-radius: 7.5px;
  padding: 10px 20px;
  color: #8c8c8c;
  font-size: 13.5px;
`;

function RecentSearch() {
  const [keywords, setKeywords] = useRecoilState(recentSearchState);

  const onClick = (event: any) => {
    event?.preventDefault();

    localStorage.removeItem("keywords");

    setKeywords([]);
  };

  return (
    <RecentSearchBox>
      <Header>
        <span>최근 검색</span>
        <span onClick={onClick}>삭제</span>
      </Header>
      <SearchList>
        {keywords &&
          keywords.map((keyword: any) => (
            <SearchText
              key={keyword + `${Math.random()}`}
              style={{ marginRight: "15px" }}>
              {keyword}
            </SearchText>
          ))}
      </SearchList>
    </RecentSearchBox>
  );
}

export default RecentSearch;
