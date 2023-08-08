import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedFormData = {
      ...formData,
      password: CryptoJS.SHA256(formData.password).toString(),
    };

    await axios
      .post("http://localhost:4000/login", hashedFormData, {
        withCredentials: true,
      })
      .then((response) => navigate("/"))
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
