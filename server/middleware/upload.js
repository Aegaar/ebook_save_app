const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const uploads = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    // if (
    //   file.mimetype === "application/pdf" ||
    //   file.mimetype === "audio/mpeg" ||
    //   file.mimetype === ".mobi" ||
    //   file.mimetype === "application/epub+zip" ||
    //   file.mimetype === "application/vnd.amazon.ebook" ||
    //   file.mimetype === "application/msword" ||
    //   file.mimetype === "application/fb2" ||
    //   file.mimetype === "text/html" ||
    //   file.mimetype === "application/x-ms-reader" ||
    //   file.mimetype === "application/x-palm-database" ||
    //   file.mimetype === "application/x-fb2" ||
    //   file.mimetype === "application/x-mobipocket-subscription" ||
    //   file.mimetype === "application/x-silverlight-app" ||
    //   file.mimetype === "text/rtf" ||
    //   file.mimetype === "application/x-tcr" ||
    //   file.mimetype === "text/plain"
    // ) {
    //   callback(null, true);
    // } else {
    //   callback(null, false);
    // }

    //TODO Repair server file extension filter [Issue with mime file filter working only on mp3, pdf, txt, epub; other file extensions generate an error when downloaded: "Network response was not ok: 500"].

    callback(null, true);
  },
});

module.exports = uploads;
