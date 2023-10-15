import { useEffect, useState } from "react";
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";
import { IPost } from "../types/postType";

function useSplitPosts(data: any) {
  const [firstCol, setFirstCol] = useState<IPost[]>([]);
  const [secondCol, setSecondCol] = useState<IPost[]>([]);
  const [thirdCol, setThirdCol] = useState<IPost[]>([]);

  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();

  useEffect(() => {
    const firstColImages: IPost[] = [];
    const secondColImages: IPost[] = [];
    const thirdColImages: IPost[] = [];

    if (isMobile) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          firstColImages.push(post);
        });
      }
    }

    if (isTabletOrLaptop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          if (index % 2 === 0) {
            firstColImages.push(post);
          } else if (index % 2 === 1) {
            secondColImages.push(post);
          }
        });
      }
    }

    if (isDesktop) {
      if (data && Array.isArray(data)) {
        data?.forEach((post: IPost, index: number) => {
          if (index % 3 === 0) {
            firstColImages.push(post);
          } else if (index % 3 === 1) {
            secondColImages.push(post);
          } else if (index % 3 === 2) {
            thirdColImages.push(post);
          }
        });
      }
    }

    setFirstCol(firstColImages);
    setSecondCol(secondColImages);
    setThirdCol(thirdColImages);
  }, [data, isMobile, isTabletOrLaptop, isDesktop]);

  return { firstCol, secondCol, thirdCol };
}

export default useSplitPosts;
