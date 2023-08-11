import axios from "axios";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";

function UserPage() {
  const sessionData = useRecoilValue(sessionState);

  const { data, isLoading, isError } = useQuery("data", () =>
    axios
      .get(`http://localhost:4000/user/${sessionData.username}`, {
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
