import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionState } from "../atoms";

function Account() {
  const [sessionData, setSessionData] = useRecoilState(sessionState);
  const [formData, setFormData] = useState({
    name: sessionData.name,
    email: sessionData.email,
    username: sessionData.username,
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:4000/account`,
        formData,
        { withCredentials: true }
      );

      setSessionData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={formData.name}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          value={formData.email}
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          required
          onChange={handleChange}
        />
        <button type="submit">계정 업데이트</button>
      </form>
      <div>
        <Link to={"/account"}>프로필 수정</Link>
        <Link to={"/account/password"}>비밀번호 변경</Link>
        <Link to={"/account/close"}>회원탈퇴</Link>
      </div>
    </>
  );
}

export default Account;
