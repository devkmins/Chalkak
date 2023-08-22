import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { sessionState } from "../atoms";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect } from "react";

function DetailPost() {
  const location = useLocation();
  const postId = location.state;

  const sessionData = useRecoilValue(sessionState);

  const { data } = useQuery("getData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const request = async (views: number) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/post/${postId}/views`,
        { views },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.views) {
      const views = Number(data.views) + 1;
      request(views);
    }
  }, [data.views]);

  return (
    <>
      {data && (
        <div key={data?._id}>
          {data?.fileUrl?.map((img: any) => (
            <img
              key={img.path}
              alt=""
              src={`http://localhost:4000/${img.path}`}
            />
          ))}
          <div>
            <h3>{data?.title}</h3>
            <h3>{data?.description}</h3>
            <h3>{data?.hashtags}</h3>
            <h4>{data?.createdAt}</h4>
            <h4>{data?.views}</h4>
          </div>
          {sessionData._id === data?.owner ? (
            <>
              <EditPost postId={data?._id} />
              <DeletePost postId={data?._id} />
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
