import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  display: flex;
  max-width: 250px;
`;

function Posts() {
  const { data } = useQuery("getData", () =>
    axios.get("http://localhost:4000/").then((response) => response.data)
  );

  return (
    <div>
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
