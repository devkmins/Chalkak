// Library
import { Link } from "react-router-dom";

// Package
import styled from "styled-components";

// Types
import { IIsMobile } from "../types/mediaQueriesType";
import { IRatioTypes } from "../types/ratioType";

export const ImagesContainer = styled.div``;

export const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
`;

export const Image = styled.img<IRatioTypes>`
  width: 100%;
  max-height: max-content;
  aspect-ratio: ${(props) => props.$ratioWidth} /
    ${(props) => props.$ratioHeight};
`;

export const ProfileContainer = styled.div<IIsMobile>`
  display: none;
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 17.5px;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    display: flex;
    position: static;
    margin-bottom: 12.5px;
    `}
`;

export const ProfileBox = styled.div<IIsMobile>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0px ${(props) => (props.$isMobile === "true" ? "12.5px" : "20px")};
`;

export const ProfileLink = styled(Link)<IIsMobile>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.$isMobile === "true" ? "black" : "#e0dfdf")};
  font-size: 16px;

  ${(props) =>
    props.$isMobile === "false" &&
    `
    &:hover {
      color: white;
      transition: color 0.25s;
    }
  `}
`;

export const PostProfileImg = styled.img`
  border-radius: 50%;
  margin-right: 10px;
  width: 32.5px;
  height: 32.5px;
`;

export const PostProfileText = styled.span`
  margin-left: 50px;
  color: #e0dfdf;
`;

export const PostBox = styled.div<IIsMobile>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin-bottom: ${(props) => (props.$isMobile === "true" ? "50px" : "25px")};

  &:hover {
    opacity: ${(props) => (props.$isMobile === "true" ? "1" : "0.875")};

    ${ProfileContainer} {
      display: flex;
    }
  }
`;
