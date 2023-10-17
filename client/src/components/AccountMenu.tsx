// Library
import { Link } from "react-router-dom";

// Package
import styled from "styled-components";

// MediaQuery
import { useMobile } from "../styles/mediaQueries";

// Constants
import {
  ACCOUNT_PATH,
  CHANGE_PASSWORD_PATH,
  CLOSE_ACCOUNT_PATH,
} from "../constants/paths";

// Styles
import { ACCOUNT_MENU_LINK_COLOR, LIGHT_GRAY_COLOR } from "../constants/colors";

// Type
import { IIsMobile } from "../types/mediaQueriesType";

interface IAccountMenuProp {
  pathname: string;
}

const LinkContainer = styled.div<IIsMobile>`
  display: flex;
  flex-direction: column;
  margin: 0px ${(props) => props.$isMobile === "true" && "22.5px"};
`;

const Text = styled.span<IIsMobile>`
  margin-left: 22.5px;
  font-size: 18px;
  font-weight: 700;

  ${(props) =>
    props.$isMobile === "true" &&
    `
    border-bottom: 1px solid ${LIGHT_GRAY_COLOR};
    padding-bottom: 25px;
    margin-left: 0px;
    `}
`;

const LinkUl = styled.ul`
  margin-top: 25px;
`;

const LinkLi = styled.li<IIsMobile>`
  padding: 17.5px ${(props) => (props.$isMobile === "true" ? "0px" : "22.5px")};
`;

const StyledLink = styled(Link)`
  font-size: 16px;
  font-weight: 300;

  &:hover {
    color: ${ACCOUNT_MENU_LINK_COLOR};
    font-weight: 350;
  }
`;

const ConnectedtLink = styled(Link)`
  font-size: 16px;
  font-weight: 350;
  color: ${ACCOUNT_MENU_LINK_COLOR};
`;

function AccountMenu({ pathname }: IAccountMenuProp) {
  const isMobile = useMobile();
  const isMobileString = String(isMobile);

  return (
    <LinkContainer $isMobile={isMobileString}>
      <Text $isMobile={isMobileString}>계정 설정</Text>
      <LinkUl>
        <LinkLi $isMobile={isMobileString}>
          {pathname === ACCOUNT_PATH ? (
            <ConnectedtLink to={ACCOUNT_PATH}>프로필 편집</ConnectedtLink>
          ) : (
            <StyledLink to={ACCOUNT_PATH}>프로필 편집</StyledLink>
          )}
        </LinkLi>
        <LinkLi $isMobile={isMobileString}>
          {pathname === CHANGE_PASSWORD_PATH ? (
            <ConnectedtLink to={CHANGE_PASSWORD_PATH}>
              비밀번호 변경
            </ConnectedtLink>
          ) : (
            <StyledLink to={CHANGE_PASSWORD_PATH}>비밀번호 변경</StyledLink>
          )}
        </LinkLi>
        <LinkLi $isMobile={isMobileString}>
          {pathname === CLOSE_ACCOUNT_PATH ? (
            <ConnectedtLink to={CLOSE_ACCOUNT_PATH}>계정 폐쇄</ConnectedtLink>
          ) : (
            <StyledLink to={CLOSE_ACCOUNT_PATH}>계정 폐쇄</StyledLink>
          )}
        </LinkLi>
      </LinkUl>
    </LinkContainer>
  );
}

export default AccountMenu;
