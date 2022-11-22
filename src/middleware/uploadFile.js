const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const wrapper = require("../utils/wrapper");
const cloudinary = require("../config/cloudinary");

module.exports = {
  uploadProduct: (request, response, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "Event-Organizer/Product",
      },
    });

    const upload = multer({ storage }).single("image");

    // eslint-disable-next-line consistent-return
    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
  uploadEvent: (request, response, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "Event-Organizer/Event",
      },
    });
    // fileSize: 500kb
    const upload = multer({
      storage,
      limits: { fileSize: 512000 },
      // eslint-disable-next-line object-shorthand, consistent-return, func-names
      fileFilter: function (req, file, callback) {
        if (
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/jpeg"
        ) {
          return callback(new Error("File format incorrect!"));
        }
        callback(null, true);
      },
    }).single("image");

    // eslint-disable-next-line consistent-return
    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
  uploadUser: (request, response, next) => {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "Event-Organizer/User",
      },
    });
    // fileSize: 5120000 bytes or 5000 kb
    const upload = multer({
      storage,
      limits: { fileSize: 5120000 },
      // eslint-disable-next-line object-shorthand, consistent-return, func-names
      fileFilter: function (req, file, callback) {
        if (
          file.mimetype !== "image/jpg" &&
          file.mimetype !== "image/png" &&
          file.mimetype !== "image/jpeg"
        ) {
          return callback(new Error("File format incorrect!"));
        }
        callback(null, true);
      },
    }).single("image");

    // eslint-disable-next-line consistent-return
    upload(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }
      if (err) {
        // An unknown error occurred when uploading.
        return wrapper.response(response, 401, err.message, null);
      }

      // Everything went fine.
      next();
    });
  },
};
