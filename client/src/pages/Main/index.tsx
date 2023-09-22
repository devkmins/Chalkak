import Posts from "../../components/Posts";
import Header from "../Header";
import IntroContent from "../../components/IntroContent";
import TopViewsPosts from "../../components/TopViewsPosts";
import NotificationBar from "../../components/NotificationBar";
import { useRecoilState } from "recoil";
import { isLoggedOutState } from "../../atoms";

function Main() {
  const [isLoggedOut, setIsLoggedOut] = useRecoilState(isLoggedOutState);

  const logoutText = "로그아웃이 완료되었습니다.";

  return (
    <>
      {isLoggedOut && <NotificationBar text={logoutText} />}
      <Header />
      <IntroContent />
      <TopViewsPosts />
      <Posts />
    </>
  );
}

export default Main;
