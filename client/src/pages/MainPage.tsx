// Library
import { useRecoilValue } from "recoil";

// Atom
import { isLoggedOutState } from "../atoms/authAtoms";

// Components
import Posts from "../components/Posts";
import Header from "../components/Header";
import IntroContent from "../components/IntroContent";
import NotificationBar from "../components/NotificationBar";

function Main() {
  const isLoggedOut = useRecoilValue(isLoggedOutState);

  const logoutText = "로그아웃이 완료되었습니다.";

  return (
    <>
      {isLoggedOut && <NotificationBar text={logoutText} />}
      <Header />
      <IntroContent />
      <Posts />
    </>
  );
}

export default Main;
