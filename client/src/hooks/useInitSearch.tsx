// Library
import { useSetRecoilState } from "recoil";

// React
import { useEffect } from "react";

// Atom
import { currentSearchState } from "../atoms/searchStateAtoms";

function useInitSearch() {
  const setCurrentSearch = useSetRecoilState(currentSearchState);

  useEffect(() => {
    setCurrentSearch("");
  }, []);

  return null;
}

export default useInitSearch;
