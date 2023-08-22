import axios from "axios";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

function DetailPost() {
  const location = useLocation();
  const postId = location.state;

  const sessionData = useRecoilValue(sessionState);

  const { data } = useQuery("getData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  return (
    <>
      {data && (
        <div key={data._id}>
          {data.fileUrl?.map((img: any) => (
            <img
              key={img.path}
              alt=""
              src={`http://localhost:4000/${img.path}`}
            />
          ))}
          <div>
            <h3>{data.title}</h3>
            <h3>{data.description}</h3>
            <h3>{data.hashtags}</h3>
            <h4>{data.createdAt}</h4>
            <h4>{data.views}</h4>
          </div>
          <Link to="/">HOme</Link>
          {sessionData._id === data.owner ? (
            <>
              <EditPost postId={data._id} />
              <DeletePost postId={data._id} />
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default DetailPost;
