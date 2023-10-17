// Package
import { styled } from "styled-components";

// Asset
import mainImg from "../assets/Images/main.webp";

// Styles
import {
  useDesktop,
  useMobile,
  useTabletOrLaptop,
} from "../styles/mediaQueries";
import { BLACK_COLOR } from "../constants/colors";

// Type
import { IIsDesktop } from "../types/mediaQueriesType";

interface IMainImg {
  $isMobile: string;
  $isTabletOrLaptop: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 80px;
  margin-bottom: 25px;
`;

const MainImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MainImg = styled.img<IMainImg>`
  aspect-ratio: 16 / 11;
  width: ${(props) =>
    props.$isMobile === "true"
      ? "100%"
      : props.$isTabletOrLaptop === "true"
      ? "87.5%"
      : "75%"};
`;

const MainLine = styled.div`
  margin-top: 8vh;
  width: 50%;
  border-top: 0.5px solid black;
`;

const MainTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7.5vh;
  text-align: center;

  span {
    color: ${BLACK_COLOR};
  }
`;

const MainTextTop = styled.span<IIsDesktop>`
  font-weight: 600;
  font-size: ${(props) => (props.$isDesktop === "true" ? "50px" : "40px")};
`;

const MainTextBottom = styled.p<IIsDesktop>`
  margin-top: 3vh;
  font-weight: 300;
  font-size: ${(props) => (props.$isDesktop === "true" ? "18px" : "16px")};
  white-space: pre-line;
  line-height: 27.5px;
  padding: 0px 65px;
`;

function IntroContent() {
  const isMobile = useMobile();
  const isTabletOrLaptop = useTabletOrLaptop();
  const isDesktop = useDesktop();
  const isMobileString = String(isMobile);
  const isTabletOrLaptopString = String(isTabletOrLaptop);
  const isDesktopString = String(isDesktop);

  return (
    <Container>
      <MainImgBox>
        <MainImg
          src={mainImg}
          alt="메인 이미지"
          sizes="(max-width: 674px) 100vw, (min-width: 675px) and (max-width: 1169px) 87.5vw, (min-width: 1170px) 75vw"
          loading="eager"
          $isMobile={isMobileString}
          $isTabletOrLaptop={isTabletOrLaptopString}
        />
      </MainImgBox>
      <MainLine />
      <MainTextBox>
        <MainTextTop $isDesktop={isDesktopString}>찰칵!</MainTextTop>
        <MainTextBottom $isDesktop={isDesktopString}>
          찰칵은 나의 시선을 타자에게 공유하는 공간입니다. <br />
          세상를 바라보는 시선을 공유하고 타자의 시선을 따라가는 발걸음을 내딛어
          보세요!
        </MainTextBottom>
      </MainTextBox>
    </Container>
  );
}

export default IntroContent;
