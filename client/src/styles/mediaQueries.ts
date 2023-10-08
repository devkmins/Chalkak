import { useMediaQuery } from "react-responsive";

export const useSmallDevice = () =>
  useMediaQuery({ query: "(max-width: 575px)" });
export const useMobile = () => useMediaQuery({ query: "(max-width: 769px)" });
export const useTabletOrLaptop = () =>
  useMediaQuery({ query: "(min-width: 770px) and (max-width: 1169px)" });
export const useDesktop = () => useMediaQuery({ query: "(min-width: 1170px)" });
