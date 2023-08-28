import { styled } from "styled-components";
import mainImg from "../assets/Main/main.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 60px;
  margin-bottom: 100px;
`;

const MainImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const MainImg = styled.div`
  background-image: url(${mainImg});
  width: 70%;
  height: 80vh;
  background-position: center bottom;
  background-size: cover;
`;

const MainLine = styled.div`
  margin-top: 8vh;
  width: 45%;
  border-top: 0.5px solid black;
`;

const MainTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7.5vh;
  text-align: center;

  span {
    color: #191b26;
  }
`;

const MainTextTop = styled.span`
  font-weight: 600;
  font-size: 50px;
`;

const MainTextBottom = styled.p`
  margin-top: 3vh;
  font-weight: 300;
  font-size: 18px;
  white-space: pre-line;
  line-height: 27.5px;
`;

function IntroContent() {
  return (
    <Container>
      <MainImgBox>
        <MainImg />
      </MainImgBox>
      <MainLine />
      <MainTextBox>
        <MainTextTop>찰칵!</MainTextTop>
        <MainTextBottom>
          찰칵은 나의 시선을 타인에게 공유하는 공간입니다. <br />
          세상를 바라보는 시선을 공유하고 타자의 시선을 따라가는 발걸음을 내딛어
          보세요.
        </MainTextBottom>
      </MainTextBox>
    </Container>
  );
}

export default IntroContent;
