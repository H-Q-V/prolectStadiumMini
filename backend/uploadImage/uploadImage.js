const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dpnxghbxb",
  api_key: "323689665689785",
  api_secret: "zLIf0IEBLp5a6eLSfNZbCyvI9WY",
});

const otps = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  folder: "blog",
};

const uploadImage = async (image) => {
  console.log(image);
  try {
    if (!image) {
      return;
    }

    const result = await cloudinary.uploader.upload(image, otps);
    console.log(result.secure_url);
    return result;
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
  }
};

module.exports = {
  uploadImage,
};