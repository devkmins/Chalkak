// Package
import styled from "styled-components";

// Constant
import { INPUT_BOX_FOCUS_COLOR } from "../../constants/colors";

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  input {
    border-radius: 5px;
    border: 1px solid gray;
    height: 45px;
    padding-left: 10px;
    font-size: 15px;

    &:focus {
      border: 1.25px solid ${INPUT_BOX_FOCUS_COLOR};
    }
  }
`;

export const InputBoxAndSpan = styled(InputBox)`
  span {
    margin-bottom: 5px;
    font-weight: 500;
  }
`;
