import axios from "axios";

function DeletePost({ postId }: any) {
  const onClick = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/post/${postId}/delete`
      );
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <h4 onClick={onClick}>Delete</h4>;
}

export default DeletePost;
