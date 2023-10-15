// Library
import { useSetRecoilState } from "recoil";

// React
import { useEffect } from "react";

// Atom
import { currentSearchState } from "../atoms/searchStateAtoms";

function useSearchClear() {
  const setCurrentSearch = useSetRecoilState(currentSearchState);

  useEffect(() => {
    setCurrentSearch("");
  }, []);
}

export default useSearchClear;
