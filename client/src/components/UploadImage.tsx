import { useState } from "react";
import CreatePost from "./CreatePost";
import Dropzone from "react-dropzone";
import axios from "axios";

export interface Image {
  path: string;
  name: string;
  size: number;
  type: string;
}

function UploadImage() {
  const [images, setImages] = useState<File[]>([]);
  const [data, setData] = useState<string[]>([]);
  const [postId, setPostId] = useState("");
  const [next, setNext] = useState(false);

  const onClick = async () => {
    if (images.length > 0) {
      setNext(true);

      const imagesFormData = new FormData();

      images.forEach((img) => {
        const blob = new Blob([JSON.stringify(images)], {
          type: "application/json",
        });
        imagesFormData.append("images[]", img);
      });

      const responseImages = await axios.post(
        "http://localhost:4000/post/upload/images",
        imagesFormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPostId(responseImages.data);
    }
  };

  const onBtnClick = () => {};

  const onDrop = (acceptedFiles: any) => {
    if (images.length < 10) {
      acceptedFiles.forEach((img: any) => {
        const url = URL.createObjectURL(img); // 일시적인 URL이라서 서버에 저장 X, 렌더링하는 용

        setData((prev) => {
          const newUrls = [...prev, url];

          return newUrls;
        });

        setImages((prev) => {
          const newImages = [...prev, img];

          return newImages;
        });
      });
    }
  };

  return (
    <>
      {next ? (
        <CreatePost postId={postId} />
      ) : (
        <>
          <Dropzone
            maxFiles={10}
            maxSize={15000000}
            accept={{ "image/*": [".png", ".jpeg", ".jpg"] }}
            onDrop={onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
          <button onClick={onClick}>{images.length} 사진 제출</button>
          <div>
            {data
              ? data.map((img) => (
                  <div key={img}>
                    <img src={img} alt="" />
                    <button onClick={onBtnClick}>X</button>
                  </div>
                ))
              : ""}
          </div>
        </>
      )}
    </>
  );
}

export default UploadImage;
