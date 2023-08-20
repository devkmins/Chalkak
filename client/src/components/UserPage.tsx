import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import { Link } from "react-router-dom";

function UserPage() {
  const location = useLocation();
  const username = location.state;

  const sessionData = useRecoilValue(sessionState);

  const { data, isLoading, isError } = useQuery("data", () =>
    axios
      .get(`http://localhost:4000/user/${username}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
  );

  return (
    <>
      {sessionData.username === username ? (
        <Link to={"/account"}>Account</Link>
      ) : (
        ""
      )}
      {data ? (
        <>
          <div>{data.name}</div>
          {data.posts.map((post: any) => (
            <>
              {post.fileUrl.map((img: any) => (
                <img
                  key={img.path}
                  alt=""
                  src={`http://localhost:4000/${img.path}`}
                />
              ))}
              <div key={post._id}>
                <span>{post.title}</span>
              </div>
            </>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserPage;
