export const convertBase64 = async (file) => {
  if (!(file instanceof Blob)) {
    throw new Error("Parameter is not a Blob or File");
  }
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const onFileChange = (event, image) => {
  const file = event.target.files[0];
  if (file) {
    image.value = file;
  }
};
