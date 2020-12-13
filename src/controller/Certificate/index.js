const certificate = require("../../services/certificate");
const cloudinary = require("cloudinary").v2;
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
var JSZip = require("jszip");

var request = require("request-promise").defaults({ encoding: null });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

exports.generate = function (req, res) {
  let image = req.body.image;
  let imageData = JSON.parse(image);

  if (
    typeof req.body["item1"] !== "string" ||
    typeof req.body["item2"] !== "string" ||
    typeof req.body["item3"] !== "string" ||
    typeof image !== "string"
  ) {
    const data = [];
    for (let i = 1; i < 4; i++) {
      let key = `item${i}`;
      let current = req.body[key];
      if (current !== null && current !== "" && current !== undefined) {
        data.push({ id: key, data: JSON.parse(current) });
      }
    }
    console.log(data);
    certificate.generate(imageData, data);

    res.json({
      message: "success",
      data: [{ url: `${process.env.BASEURL}/files/${imageData.filename}.pdf` }],
    });
    res.end();
  } else {
    res.json({
      message: "value must be string!",
    });
    res.end();
  }
};

exports.generateMultiple = async function (req, res) {
  let image = req.body.image;

  if (
    typeof req.body["item1"] === "string" &&
    typeof req.body["item2"] === "string" &&
    typeof req.body["item3"] === "string" &&
    typeof image === "string"
  ) {
    let imageData = JSON.parse(image);

    const data = [];
    for (let i = 1; i < 4; i++) {
      let key = `item${i}`;
      let current = req.body[key];
      if (current !== null && current !== "" && current !== undefined) {
        data.push({ id: key, data: JSON.parse(current) });
      }
    }

    let totalData = JSON.parse(req.body["item1"]).text.length;

    let result = [];
    for (let i = 0; i < totalData; i++) {
      const pdfName = await certificate.generateMultiple(imageData, data, i);
      result.push({
        url: `${process.env.BASEURL}/files/${pdfName}`,
        fileName: pdfName,
      });
    }

    var zip = new JSZip();

    let PromiseArray = result.map((dataItem) => {
      return request.get(dataItem.url);
    });
    let dataResult = await Promise.all(PromiseArray);
    dataResult.map((element, index) => {
      zip.file(result[index].fileName, element, { base64: true });
    });

    zip.generateAsync({ type: "nodebuffer" }).then((content) => {
      fs.writeFileSync("uploads/output.zip", content);
    });

    result.push({
      url: `${process.env.BASEURL}/files/output.zip`,
      fileName: "output.zip",
    });
    res.json({
      message: "success",
      data: result,
    });
    res.end();
  } else {
    res.json({
      message: "value must be string!",
    });
    res.end();
  }
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

function readExcel(file) {
  let data = [];
  const result = excelToJson({
    source: fs.readFileSync(file.path),
    columnToKey: {
      A: "{{A1}}",
      B: "{{B1}}",
      C: "{{C1}}",
    },
    header: {
      rows: 1,
    }, // fs.readFileSync return a Buffer
  });
  let resultSheet = result["Sheet1"];
  let keys = Object.keys(resultSheet[0]);

  for (let i = 0; i < keys.length; i++) {
    let tempData = {};
    let tempValues = [];

    for (let j = 0; j < resultSheet.length; j++) {
      tempValues.push(resultSheet[j][keys[i]]);
    }
    tempData["header"] = keys[i];
    tempData["data"] = tempValues;
    data.push(tempData);
  }

  return data.slice(0, 3);
}

exports.uploadMultiple = async function (req, res) {
  const file = req.files;
  const excel = file[0];
  const image = file[1];
  let data = {};

  var setData = function (val) {
    Object.assign(data, { image: val });
  };

  await cloudinary.uploader
    .upload(image.path)
    .then((result) => {
      setData({
        path: result.secure_url,
        filename: result.original_filename,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "failed",
        error,
      });
    });

  const excelRes = readExcel(excel);
  Object.assign(data, { excel: excelRes });
  res.status(200).send({
    message: "success",
    data: data,
  });
};
