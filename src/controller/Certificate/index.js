const certificate = require("../../services/certificate");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.generate = function (req, res) {
  let image = req.body.image;
  let imageData = JSON.parse(image);

  const data = [];
  for (let i = 1; i < 4; i++) {
    let key = `item${i}`;
    let current = req.body[key];
    if (current !== null && current !== "" && current !== undefined) {
      data.push({ id: key, data: JSON.parse(current) });
    }
  }

  certificate.generate(imageData, data);

  res.json({
    message: "success",
    data: [{ url: `${process.env.BASEURL}/files/${imageData.filename}.pdf` }],
  });
  res.end();
};

exports.upload = function (req, res) {
  const image = req.file;
  cloudinary.uploader
    .upload(image.path)
    .then((result) => {
      res.status(200).send({
        message: "success",
        data: { path: result.secure_url, filename: result.original_filename },
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failed",
        error,
      });
    });
};
