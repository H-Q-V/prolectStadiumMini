const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dzw054jag",
  api_key: "582833614488397",
  api_secret: "qPwLyEdpidv5NHa7a1bGV5cr-1U",
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
    console.log("🚀 ~ uploadImage ~ result:", "Ok nhas");
    return result;
  } catch (error) {
    console.log("🚀 ~ uploadImage ~ error:", error);
  }
};

module.exports = {
  uploadImage,
};
