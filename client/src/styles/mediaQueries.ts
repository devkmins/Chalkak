import { useMediaQuery } from "react-responsive";

export const useSmallDevice = () =>
  useMediaQuery({ query: "(max-width: 575px)" });
export const useMobile = () => useMediaQuery({ query: "(max-width: 674px)" });
export const useTabletOrLaptop = () =>
  useMediaQuery({ query: "(min-width: 675px) and (max-width: 1169px)" });
export const useDesktop = () => useMediaQuery({ query: "(min-width: 1170px)" });
