const multer = require("multer");
var storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "uploads");
  // },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });

module.exports = function (app) {
  var certificate = require("./controller/certificate/index");

  app.route("/api/").get(function (req, res) {
    res.status(200).json({
      message: "apiv1",
    });
    res.end();
  });

  app
    .route("/api/certificate/")
    .post(upload.single("image"), certificate.generate);

  app.route("/api/upload/").post(upload.single("file"), certificate.upload);
};
