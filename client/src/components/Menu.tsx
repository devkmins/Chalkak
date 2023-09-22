import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
  min-width: max-content;
  min-height: 80px;
  background-color: white;
  border: 1px solid lightgray;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-left-radius: 10px;
  margin-top: 2.5px;
  right: 35px;

  a {
    font-size: 15px;
  }
`;

function Menu() {
  const sessionData = useRecoilValue(sessionState);

  return (
    <Container>
      <Link to={`/user/${sessionData.username}`}>프로필 보기</Link>
      <Link to={"/account"}>계정 설정</Link>
    </Container>
  );
}

export default Menu;
