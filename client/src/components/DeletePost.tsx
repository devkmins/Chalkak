import axios from "axios";
import { useNavigate } from "react-router-dom";

function DeletePost({ postId }: any) {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/post/${postId}/delete`,
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <h4 onClick={onClick}>Delete</h4>;
}

export default DeletePost;
