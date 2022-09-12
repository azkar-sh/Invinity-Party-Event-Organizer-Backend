const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "drkoj1bvv",
  api_key: "429211215133721",
  api_secret: "jEM6lMtcpsF9EcTPYZjKj49Roy8",
  secure: true,
});

module.exports = cloudinary;
