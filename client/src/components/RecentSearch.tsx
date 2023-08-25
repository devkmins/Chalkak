import { useRecoilState } from "recoil";
import { recentSearchState } from "../atoms";

function RecentSearch() {
  const [keywords, setKeywords] = useRecoilState(recentSearchState);

  const onClick = (event: any) => {
    event?.preventDefault();

    localStorage.removeItem("keywords");

    setKeywords([]);
  };

  return (
    <>
      {keywords &&
        keywords.map((keyword: any) => (
          <span
            key={keyword + `${Math.random()}`}
            style={{ marginRight: "15px" }}>
            {keyword}
          </span>
        ))}
      <h5 onClick={onClick}>삭제</h5>
    </>
  );
}

export default RecentSearch;
