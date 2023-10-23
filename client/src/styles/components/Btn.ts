// Package
import styled from "styled-components";

// Constants
import { BLACK_COLOR, WHITE_COLOR } from "../../constants/colors";

export const Btn = styled.button`
  width: 100%;
  height: 45px;
  color: ${WHITE_COLOR};
  background-color: ${BLACK_COLOR};
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
`;
