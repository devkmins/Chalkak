import { useState } from "react";
import CreatePost from "./CreatePost";
import Dropzone from "react-dropzone";

export interface Image {
  path: string;
  name: string;
  size: number;
  type: string;
}

function UploadImage() {
  const [images, setImages] = useState<Image[]>([]);
  const [next, setNext] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const onClick = () => {
    if (images.length > 0) {
      setNext(true);
    }
  };

  const onDrop = (acceptedFiles: any) => {
    acceptedFiles.map((img: any) => {
      if (images.length < 10) {
        const url = URL.createObjectURL(img);
        setData((prev) => {
          return [...prev, url];
        });

        setImages((prev) => {
          const objImg = Object(img);
          const newImage = {
            path: objImg.path,
            name: objImg.name,
            size: objImg.size,
            type: objImg.type,
          };
          const newImages = [...prev, newImage];

          return newImages;
        });
      }

      return null;
    });
  };

  //console.log(data);

  return (
    <>
      {next ? (
        data ? (
          data.map((img) => <img src={img} key={img} alt="" />)
        ) : (
          <CreatePost images={images} />
        )
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
        </>
      )}
    </>
  );
}

export default UploadImage;
