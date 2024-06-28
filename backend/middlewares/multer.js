import multer from "multer"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("here")
    return cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    return cb(null, file.originalname);
  },
});

const upload = multer({ storage });

export { upload };
