import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import styled from "styled-components";
import SearchPost from "./SearchPost";

const StyledLink = styled(Link)`
  display: flex;
  max-width: 250px;
`;

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

      <SearchPost />

      {Array.isArray(data)
        ? data.map((post: any) => (
            <div
              key={post._id}
              style={{ border: "1px solid black", maxWidth: "250px" }}>
              <StyledLink to={`/post/${post.title}`} state={post._id}>
                {post.fileUrl.map((img: any) => (
                  <img
                    key={img.path}
                    alt=""
                    src={`http://localhost:4000/${img.path}`}
                  />
                ))}
              </StyledLink>
              <br />
              <Link
                to={`/user/${post.owner.username}`}
                state={post.owner.username}>
                {post.owner.name}
              </Link>
            </div>
          ))
        : ""}
    </div>
  );
}

export default Posts;
