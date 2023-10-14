import { useSetRecoilState } from "recoil";
import { currentSearchState } from "../atoms/searchStateAtoms";
import { useEffect } from "react";

function useInitSearch() {
  const setCurrentSearch = useSetRecoilState(currentSearchState);

  useEffect(() => {
    setCurrentSearch("");
  }, []);

  return null;
}

export default useInitSearch;
