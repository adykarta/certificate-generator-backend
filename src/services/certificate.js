const Jimp = require("jimp");
const fs = require("fs");
const { v4 } = require("uuid");

generatePdf = (width, height, filename, pdfname) => {
  const PdfPrinter = require("pdfmake");
  const printer = new PdfPrinter({});
  const docDefinition = {
    pageSize: { width: width, height: height },
    pageMargins: [0, 0, 0, 0],
    content: [{ image: "uploads/" + filename }],
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinition);

  pdfDoc.pipe(fs.createWriteStream("uploads/" + pdfname));
  pdfDoc.end();
};

generate = async (img, data) => {
  const image = await Jimp.read(img.path);
  const fontBig = await Jimp.loadFont("src/assets/font/arial-big.ttf.fnt");
  // const fontMedium = await Jimp.loadFont(
  //   "src/assets/font/arial-medium.ttf.fnt"
  // );
  // const fontSmall = await Jimp.loadFont("src/assets/font/arial-small.ttf.fnt");

  const fullWidth = image.getWidth();
  const fullHeight = image.getHeight();

  const imageFileName = `${img.filename}.png`;
  const pdfFileName = `${img.filename}.pdf`;
  data.forEach(async (element) => {
    // const nameWidth = Jimp.measureText(fontBig, element.data.text);
    const nameX = element.data.width;
    const nameY = element.data.height;
    await image.print(fontBig, nameX, nameY, element.data.text).quality(60);
  });

  await image.writeAsync("uploads/" + imageFileName);

  generatePdf(fullWidth, fullHeight, imageFileName, pdfFileName);

  //   image.resize(842, 595);
};

generateMultiple = async (img, data, idx) => {
  const image = await Jimp.read(img.path);
  const fontBig = await Jimp.loadFont("src/assets/font/arial-big.ttf.fnt");
  // const fontMedium = await Jimp.loadFont(
  //   "src/assets/font/arial-medium.ttf.fnt"
  // );
  // const fontSmall = await Jimp.loadFont("src/assets/font/arial-small.ttf.fnt");

  const fullWidth = image.getWidth();
  const fullHeight = image.getHeight();

  const imageFileName = `${img.filename + v4()}.png`;
  const pdfFileName = `${img.filename + v4()}.pdf`;
  data.forEach(async (element) => {
    // const nameWidth = Jimp.measureText(fontBig, element.data.text);
    const nameX = element.data.width;
    const nameY = element.data.height;
    await image
      .print(fontBig, nameX, nameY, element.data.text[idx])
      .quality(60);
  });

  await image.writeAsync("uploads/" + imageFileName);

  generatePdf(fullWidth, fullHeight, imageFileName, pdfFileName);
  return pdfFileName;
  //   image.resize(842, 595);
};

exports.generate = generate;
exports.generateMultiple = generateMultiple;
