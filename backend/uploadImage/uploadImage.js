const cloudinary = require("cloudinary").v2;
//const {CloudinaryStorage} = require("multer-storage-cloudinary");
//const multer = require("multer");


cloudinary.config({
  cloud_name: "dpnxghbxb",
  api_key: "323689665689785",
  api_secret: "zLIf0IEBLp5a6eLSfNZbCyvI9WY",
});
const otps = {
  overwrite: true,
  invalidate: true,
  //resource_type: "auto",
  resource_type: "image", 
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

// Hàm xóa hình ảnh
const deleteImage = async (imageUrl) => {
  try {
    const publicId = extractPublicIdFromUrl(imageUrl);
    console.log("public",publicId);
    if (!publicId) {
      console.error("Chưa cung cấp ID công khai");
      throw new Error("Chưa cung cấp ID công khai");
    }

    console.log("Đang xóa hình ảnh với ID công khai:", publicId);
    
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    
    if (result.result === 'not found') {
      console.log(`Hình ảnh với ID ${publicId} không tìm thấy trên Cloudinary`);
    } else {
      console.log("Hình ảnh đã được xóa thành công:", result.result);
    }

    return result;
    
  } catch (error) {
    //console.error("Lỗi khi xóa hình ảnh:", error.message);
    //throw error;
    console.log("lỗi");
  }
};

const extractPublicIdFromUrl = (imageUrl) => {
  try {
    const parts = imageUrl.split('/');
    const file = parts[parts.length - 1];
    const file2 = parts[parts.length - 2];
    const parts2 = file.split('.')[0];
    const publicId = file2 + "/" + parts2;
    return publicId;
  } catch (error) {
    console.error("Lỗi khi trích xuất publicId:", error.message);
    return null;
  }
};

const imageUpdater = async (oldImageUrl, newImagePath) => {
  try {
    const publicId = extractPublicIdFromUrl(oldImageUrl);

    //if (publicId) {
      await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    //}

    const result = await cloudinary.uploader.upload(newImagePath, otps);
    return result;
  } catch (error) {
    throw new Error("Không thể cập nhật ảnh. Vui lòng thử lại.");
  }
};


module.exports = {
  uploadImage,
  deleteImage,
  imageUpdater,
};

