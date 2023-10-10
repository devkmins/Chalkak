import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMobile } from "../styles/mediaQueries";

interface AccountMenuProp {
  pathname: string;
}

interface IIsMobile {
  $isMobile: string;
}

const LinkContainer = styled.div<IIsMobile>`
  display: flex;
  flex-direction: column;
  margin: 0px ${(props) => (props.$isMobile === "true" ? "22.5px" : "0px")};
`;

const Text = styled.span<IIsMobile>`
  border-bottom: ${(props) =>
    props.$isMobile === "true" ? "1px solid #dddddd" : "none"};
  padding-bottom: ${(props) => (props.$isMobile === "true" ? "25px" : "0px")};
  margin-left: ${(props) => (props.$isMobile === "true" ? "0px" : "22.5px")};
  font-size: 18px;
  font-weight: 700;
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
    color: #060606;
    font-weight: 350;
  }
`;

const ConnectedtLink = styled(Link)`
  font-size: 16px;
  font-weight: 350;
  color: #060606;
`;

function AccountMenu({ pathname }: AccountMenuProp) {
  const isMobile = useMobile();

  return (
    <LinkContainer $isMobile={String(isMobile)}>
      <Text $isMobile={String(isMobile)}>계정 설정</Text>
      <LinkUl>
        <LinkLi $isMobile={String(isMobile)}>
          {pathname === "/account" ? (
            <ConnectedtLink to={"/account"}>프로필 편집</ConnectedtLink>
          ) : (
            <StyledLink to={"/account"}>프로필 편집</StyledLink>
          )}
        </LinkLi>
        <LinkLi $isMobile={String(isMobile)}>
          {pathname === "/account/password" ? (
            <ConnectedtLink to={"/account/password"}>
              비밀번호 변경
            </ConnectedtLink>
          ) : (
            <StyledLink to={"/account/password"}>비밀번호 변경</StyledLink>
          )}
        </LinkLi>
        <LinkLi $isMobile={String(isMobile)}>
          {pathname === "/account/close" ? (
            <ConnectedtLink to={"/account/close"}>계정 폐쇄</ConnectedtLink>
          ) : (
            <StyledLink to={"/account/close"}>계정 폐쇄</StyledLink>
          )}
        </LinkLi>
      </LinkUl>
    </LinkContainer>
  );
}

export default AccountMenu;
