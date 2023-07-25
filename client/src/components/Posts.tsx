import axios from "axios";
import { useQuery } from "react-query";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

function Posts() {
  const { data, isLoading, isError } = useQuery("getData", () =>
    axios.get("http://localhost:4000/").then((response) => response.data)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred.</div>;

  return (
    <div>
      <CreatePost />
      {data.map((post: any) => (
        <div
          key={post._id}
          style={{ border: "1px solid black", width: "250px" }}>
          <h2>{post.title}</h2>
          <h4>: {post.description}</h4>
          <h5>{post.hashtags}</h5>
          <h5>{post.createdAt}</h5>
          <span>{post.views}</span>
          <EditPost postId={post._id} />
          <DeletePost postId={post._id} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
