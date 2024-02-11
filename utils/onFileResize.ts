import Resizer from "react-image-file-resizer";

export const onFileResize = (file: Blob, setter: any) => {
  //^compress the file then store in base64
  return new Promise((resolve) => {
    //^ Wait until the image is compressed before storing

    Resizer.imageFileResizer(
      file, // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        setter(uri);
        resolve(uri);
      },
      "base64" // blob or base64 default base64
    );
  });
};
