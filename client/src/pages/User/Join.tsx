import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { useSetRecoilState } from "recoil";
import { loggedInState, sessionState } from "../../atoms";

function Join() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const setLoggedIn = useSetRecoilState(loggedInState);
  const setSessionData = useSetRecoilState(sessionState);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedJoinFormData = {
      ...formData,
      password: CryptoJS.SHA256(formData.password).toString(),
      confirmPassword: CryptoJS.SHA256(formData.confirmPassword).toString(),
    };

    const { username, password } = formData;

    const hashedLoginFormData = {
      username,
      password: CryptoJS.SHA256(formData.password).toString(),
    };

    const join = await axios
      .post("http://localhost:4000/join", hashedJoinFormData, {
        withCredentials: true,
      })
      .catch((error) => setError(error.response.data.error));

    const login = await axios
      .post("http://localhost:4000/login", hashedLoginFormData, {
        withCredentials: true,
      })
      .then((response) => {
        setLoggedIn(true);
        setSessionData(response.data.user);
        navigate("/");
      })
      .catch((error) => setError(error.response.data.error));
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
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Join;