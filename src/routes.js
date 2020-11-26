const multer = require("multer");
const { v4 } = require("uuid");
var storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "uploads");
  // },
  filename: function (req, file, cb) {
    let type = file.originalname.split(".");
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "-" +
        v4() +
        "." +
        type[type.length - 1]
    );
  },
});

var upload = multer({ storage: storage });

module.exports = function (app) {
  var certificate = require("./controller/Certificate/index");
  var utils = require("./controller/Utils/index");

  app.route("/api/").get(function (req, res) {
    res.status(200).json({
      message: "apiv1",
    });
    res.end();
  });

  app.route("/api/certificate/").post(certificate.generate);

  app.route("/api/upload/").post(upload.single("file"), certificate.upload);
  app
    .route("/api/upload/multiple/")
    .post(upload.array("files", 2), certificate.uploadMultiple);
  app.route("/files/:name").get(utils.download);
};
