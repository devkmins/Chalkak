// React
import { debounce } from "lodash";
import { useEffect } from "react";

function useScrollEvent(callback: any) {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;

      if (windowHeight + scrollTop >= scrollHeight - 50) {
        callback();
      }
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
}

export default useScrollEvent;
