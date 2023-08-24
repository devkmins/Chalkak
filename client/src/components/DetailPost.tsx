import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, sessionState } from "../atoms";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import { useEffect, useState } from "react";

function DetailPost() {
  const location = useLocation();
  const postId = location.state;

  const sessionData = useRecoilValue(sessionState);
  const loggedIn = useRecoilValue(loggedInState);

  const { data } = useQuery("getData", () =>
    axios
      .get(`http://localhost:4000/post/${postId}`)
      .then((response) => response.data)
  );

  const requestViews = async (views: number) => {
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
    if (data?.views) {
      const views = Number(data.views) + 1;
      requestViews(views);
    }
  }, [data?.views]);

  const [clickLikes, setClickLikes] = useState(
    data?.likes?.includes(sessionData._id)
  );

  const [likes, setLikes] = useState(data?.likes?.length);

  const likesBtn = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4000/post/${postId}/likes`,
        "",
        { withCredentials: true }
      );

      setClickLikes(!clickLikes);
      setLikes(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setClickLikes(data?.likes?.includes(sessionData._id));
    setLikes(data?.likes?.length);
  }, [data]);

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
            <h3>제목: {data?.title}</h3>
            <h3>설명: {data?.description}</h3>
            <h3>태그: {data?.hashtags}</h3>
            <h4>작성일: {data?.createdAt}</h4>
            <h4>조회수: {data?.views}</h4>
            <h4>좋아요: {likes}</h4>
            {loggedIn && (
              <button onClick={likesBtn}>
                {clickLikes ? "좋아요 취소" : "좋아요"}
              </button>
            )}
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
