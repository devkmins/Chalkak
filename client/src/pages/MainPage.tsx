// Library
import { useRecoilValue } from "recoil";

// Atom
import { isLoggedOutState } from "../atoms/authAtoms";

// Components
import Posts from "../components/Posts";
import Header from "../components/Header";
import IntroContent from "../components/IntroContent";
import NotificationBar from "../components/NotificationBar";

// Constant
import { logoutSuccessText } from "../constants/notificationMessages";

function Main() {
  const isLoggedOut = useRecoilValue(isLoggedOutState);

  return (
    <>
      {isLoggedOut && <NotificationBar text={logoutSuccessText} />}
      <Header />
      <IntroContent />
      <Posts />
    </>
  );
}

export default Main;
