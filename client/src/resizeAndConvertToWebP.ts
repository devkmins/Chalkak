import Resizer from "react-image-file-resizer";

export async function resizeAndConvertToWebP(imageFile: File) {
  return new Promise(async (resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);

    image.onload = () => {
      const originalWidth = image.width;
      const originalHeight = image.height;

      Resizer.imageFileResizer(
        imageFile,
        originalWidth,
        originalHeight,
        "WEBP",
        50,
        0,
        (blob) => {
          resolve(blob);
        },
        "file"
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}
