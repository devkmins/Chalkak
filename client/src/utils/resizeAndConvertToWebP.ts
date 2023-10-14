// Library
import Resizer from "react-image-file-resizer";

function gcd(a: number, b: number): number {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
}

export async function resizeAndConvertToWebP(imageFile: File) {
  return new Promise(async (resolve, reject) => {
    const image = new Image();
    image.src = URL.createObjectURL(imageFile);

    image.onload = () => {
      const originalWidth = image.width;
      const originalHeight = image.height;
      const gcdValue = gcd(originalWidth, originalHeight);
      const ratioWidth = originalWidth / gcdValue;
      const ratioHeight = originalHeight / gcdValue;

      Resizer.imageFileResizer(
        imageFile,
        originalWidth,
        originalHeight,
        "WEBP",
        0.5,
        0,
        (blob) => {
          const result = {
            blob,
            ratioWidth,
            ratioHeight,
          };
          resolve(result);
        },
        "file"
      );
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}
