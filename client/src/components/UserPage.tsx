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

  let totalViews = 0;
  let totalLikes = 0;

  data?.posts?.map((post: any) => (totalViews += post.views));
  data?.posts?.map((post: any) => (totalLikes += post.likes.length));

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
          <h4>Total Views: {totalViews}</h4>
          <h4>Total Likes: {totalLikes}</h4>
          {data.posts.map((post: any) => (
            <div key={post._id}>
              {post.fileUrl.map((img: any) => (
                <img
                  key={img.path}
                  alt=""
                  src={`http://localhost:4000/${img.path}`}
                />
              ))}
              <div>
                <span>{post.title}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserPage;
