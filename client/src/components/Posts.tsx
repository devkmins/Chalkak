import axios from "axios";
import { useQuery } from "react-query";
import CreatePost from "./CreatePost";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { loggedInState, sessionState } from "../atoms/atoms";
import { useEffect } from "react";

function Posts() {
  const { data, isLoading, isError } = useQuery("getData", () =>
    axios.get("http://localhost:4000/").then((response) => response.data)
  );

  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [sessionData, setSessionData] = useRecoilState(sessionState);

  useEffect(() => {
    axios
      .get("http://localhost:4000/login", { withCredentials: true })
      .then((response) => {
        setLoggedIn(response.data.loggedIn);
        setSessionData(response.data.user);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred.</div>;

  return (
    <div>
      {loggedIn ? (
        <>
          {sessionData ? <h2>안녕하세요 {sessionData?.name}님.</h2> : ""}
          <Link to={"/user/logout"}>Logout</Link>
          <CreatePost />
        </>
      ) : (
        <>
          <Link to={"/join"}>Join</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}

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
