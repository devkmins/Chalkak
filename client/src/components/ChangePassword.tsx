import axios from "axios";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { useLocation, useNavigate } from "react-router-dom";
import AccountMenu from "./AccountMenu";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newConfirmPassword: "",
  });

  const location = useLocation();
  const pathname = location.pathname;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const hashedFormData = {
      currentPassword: CryptoJS.SHA256(formData.currentPassword).toString(),
      newPassword: CryptoJS.SHA256(formData.newPassword).toString(),
      newConfirmPassword: CryptoJS.SHA256(
        formData.newConfirmPassword
      ).toString(),
    };

    try {
      const response = await axios.patch(
        `http://localhost:4000/account/password`,
        hashedFormData,
        { withCredentials: true }
      );

      navigate("/");
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
      <AccountMenu pathname={pathname} />
      <form onSubmit={handleSubmit}>
        <input
          name="currentPassword"
          type="password"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          name="newConfirmPassword"
          type="password"
          placeholder="New Confirm Password"
          value={formData.newConfirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ChangePassword;
