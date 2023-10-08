import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 87.5px;
  height: 80px;
  background-color: white;
  border: 1px solid lightgray;
  border-bottom-left-radius: 12.5px;
  border-bottom-right-radius: 12.5px;
  border-top-left-radius: 12.5px;
  margin-top: 10px;
  right: 25px;

  a {
    font-size: 15px;
  }
`;

function GuestMenu() {
  return (
    <Container>
      <Link to={"/login"}>로그인</Link>
      <Link to={"/join"}>가입</Link>
    </Container>
  );
}

export default GuestMenu;
