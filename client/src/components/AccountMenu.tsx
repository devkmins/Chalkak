import { Link } from "react-router-dom";
import styled from "styled-components";

interface AccountMenuProp {
  pathname: string;
}

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Text = styled.span`
  margin-left: 22.5px;
  font-size: 18px;
  font-weight: 700;
`;

const LinkUl = styled.ul`
  margin-top: 25px;
`;

const LinkLi = styled.li`
  padding: 17.5px 22.5px;
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
  return (
    <LinkContainer>
      <Text>계정 설정</Text>
      <LinkUl>
        <LinkLi>
          {pathname === "/account" ? (
            <ConnectedtLink to={"/account"}>프로필 편집</ConnectedtLink>
          ) : (
            <StyledLink to={"/account"}>프로필 편집</StyledLink>
          )}
        </LinkLi>
        <LinkLi>
          {pathname === "/account/password" ? (
            <ConnectedtLink to={"/account/password"}>
              비밀번호 변경
            </ConnectedtLink>
          ) : (
            <StyledLink to={"/account/password"}>비밀번호 변경</StyledLink>
          )}
        </LinkLi>
        <LinkLi>
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
