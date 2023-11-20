const path = require("path");
const multer = require("multer");
const multerS3 = require("multer-s3");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".PNG",
  ".JPG",
  ".JPEG",
  ".BMP",
];
const file_allowedExtensions = [
  ".png",
  ".jpg",
  ".jpeg",
  ".bmp",
  ".PNG",
  ".JPG",
  ".JPEG",
  ".BMP",
  ".pdf",
  ".PDF"
];
const { region, accessKeyId, secretAccessKey } = require("./s3");
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

const imageUploader_comment = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sw-team9",
    key: async function (req, file, callback) {
      //const uploadDirectory = req.query.directory ?? "";

      const uploadDirectory = "comment";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      const user_id = await req.verifiedToken.userId;
      const post_id = await req.params.postId;
      callback(null, `${uploadDirectory}/${post_id}_${user_id}_${Date.now()}${extension}`); // 각 이미지마다 고유한 이름을 생성
    },
    acl: "public-read-write",
  }),
});
const imageUploader_post = multer({
  storage: multerS3({
    s3: s3,
    bucket: "sw-team9",
    key: async function (req, file, callback) {
      //const uploadDirectory = req.query.directory ?? "";

      const uploadDirectory = "post";
      const extension = path.extname(file.originalname);
      if (!allowedExtensions.includes(extension)) {
        return callback(new Error("wrong extension"));
      }
      const user_id = await req.verifiedToken.userId;
      callback(null, `${uploadDirectory}/${user_id}_${Date.now()}${extension}`); // 각 이미지마다 고유한 이름을 생성
    },
    acl: "public-read-write",
  }),
});

module.exports = {imageUploader_comment:imageUploader_comment, imageUploader_post:imageUploader_post};