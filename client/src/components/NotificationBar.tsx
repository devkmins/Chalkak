// Library
import { useSetRecoilState } from "recoil";

// Package
import styled from "styled-components";

// Atom
import { isLoggedOutState } from "../atoms/authAtoms";

// React
import { useEffect, useState } from "react";

// React-icons
import { GrFormClose } from "@react-icons/all-files/gr/GrFormClose";

interface IProp {
  text: string;
}

interface IContainerProp {
  $clicked: string;
}

const Container = styled.div<IContainerProp>`
  display: flex;
  position: fixed;
  z-index: 101;
  width: 100%;
  height: 75px;
  background-color: #767676;
  font-weight: 600;
  font-size: 17px;
  color: #e4e3e3;

  @keyframes slideIn {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0%);
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(-100%);
    }
  }

  animation: ${(props) => (props.$clicked === "true" ? "slideOut" : "slideIn")}
    0.5s ease-in-out 0s 1 normal forwards;
`;

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

const StyledGrFormClose = styled(GrFormClose)`
  width: 30px;
  height: 30px;
  cursor: pointer;
  padding-right: 5px;

  path {
    stroke: #f2efef;

    &:hover {
      stroke: white;
    }
  }
`;

function NotificationBar({ text }: IProp) {
  const [clicked, setClicked] = useState(false);
  const clickedString = String(clicked);

  const setIsLoggedOut = useSetRecoilState(isLoggedOutState);

  const handleClick = () => {
    setClicked(true);
    setIsLoggedOut(false);
  };

  useEffect(() => {
    setTimeout(handleClick, 3000);
  }, []);

  return (
    <Container $clicked={clickedString}>
      <Box>
        <span>{text}</span>
      </Box>
      <StyledGrFormClose onClick={handleClick} />
    </Container>
  );
}

export default NotificationBar;
