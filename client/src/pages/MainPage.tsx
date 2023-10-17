// Library
import { useRecoilValue } from "recoil";

// Atom
import { isLoggedOutState } from "../atoms/authAtoms";

// Components
import MainPosts from "../components/MainPosts";
import Header from "../components/Header";
import IntroContent from "../components/IntroContent";
import NotificationBar from "../components/NotificationBar";

// Constant
import { LOGOUT_SUCCESS_TEXT } from "../constants/notificationMessages";

function Main() {
  const isLoggedOut = useRecoilValue(isLoggedOutState);

  return (
    <>
      {isLoggedOut && <NotificationBar text={LOGOUT_SUCCESS_TEXT} />}
      <Header />
      <IntroContent />
      <MainPosts />
    </>
  );
}

export default Main;
