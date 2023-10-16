import { RefObject, useEffect } from "react";

function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (ref.current && !ref.current.contains(targetNode)) {
        callback();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
}

export default useClickOutside;
