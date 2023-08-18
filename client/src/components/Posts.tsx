import axios from "axios";
import { useQuery } from "react-query";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../atoms";

function Posts() {
  const { data } = useQuery("getData", () =>
    axios.get("http://localhost:4000/").then((response) => response.data)
  );

  const loggedIn = useRecoilValue(loggedInState);
  const sessionData = useRecoilValue(sessionState);

  return (
    <div>
      {loggedIn ? (
        <>
          {sessionData ? <h2>안녕하세요 {sessionData?.name}님.</h2> : ""}
          <Link to={"/user/logout"}>Logout</Link>
          <Link
            to={`/user/${sessionData.username}`}
            state={sessionData.username}>
            My Profile
          </Link>
          <Link to={"/post/upload"}>Upload</Link>
        </>
      ) : (
        <>
          <Link to={"/join"}>Join</Link>
          <Link to={"/login"}>Login</Link>
        </>
      )}

      {data
        ? data.map((post: any) => (
            <div
              key={post._id}
              style={{ border: "1px solid black", width: "250px" }}>
              {post.fileUrl.map((img: any) => (
                <img
                  key={img.path}
                  alt=""
                  src={`http://localhost:4000/${img.path}`}
                />
              ))}
              <h2>{post.title}</h2>
              <h4>: {post.description}</h4>
              <h5>{post.hashtags}</h5>
              <h5>{post.createdAt}</h5>
              <Link
                to={`/user/${post.owner.username}`}
                state={post.owner.username}>
                {post.owner.name}
              </Link>
              <br />
              <span>{post.views}</span>
              {sessionData._id === post.owner._id ? (
                <>
                  <EditPost postId={post._id} />
                  <DeletePost postId={post._id} />
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : ""}
    </div>
  );
}

export default Posts;
