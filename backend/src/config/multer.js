const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images"); //hỉnh ảnh sẽ chưa trong folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname); // mặc định sẽ save name của hình ảnh
    // là name gốc, chúng ta có thể rename nó.
  },
});

const upload = multer({ storage: storage }); //save trên local của server khi dùng multer

module.exports = upload;
