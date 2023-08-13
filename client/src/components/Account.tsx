import { Link } from "react-router-dom";

function Account() {
  return (
    <>
      <Link to={"/account"}>프로필 수정</Link>
      <Link to={"/account/password"}>비밀번호 변경</Link>
      <Link to={"/account/close"}>회원탈퇴</Link>
    </>
  );
}

export default Account;
