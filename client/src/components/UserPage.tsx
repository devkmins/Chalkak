import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

function UserPage() {
  const location = useLocation();
  const postOwner = location.state;

  const { data, isLoading, isError } = useQuery("data", () =>
    axios
      .get(`http://localhost:4000/user/${postOwner}`, {
        withCredentials: true,
      })
      .then((response) => response.data)
  );

  return (
    <>
      {data ? (
        <>
          <div>{data.name}</div>
          {data.posts.map((post: any) => (
            <div key={post._id}>
              <span>{post.title}</span>
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
