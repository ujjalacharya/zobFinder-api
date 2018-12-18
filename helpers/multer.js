const path = require("path");
const multer = require("multer");

//storage management for the file
//that will be uploaded
const userAvatar = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/avatars");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//management of the storage and the file that will be uploaded
//.single expects the name of the file input field
exports.uploadAvatar = multer({
  storage: userAvatar,
  limits: {
    fileSize: 1024 * 1024 * 5 // accept upto 5mb file only
  },
  fileFilter: fileFilter
}).single("avatar");
