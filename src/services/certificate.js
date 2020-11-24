const Jimp = require("jimp");

generateCertificate = async () => {
  const image = await Jimp.read("src/assets/example-certificate.png");
  const fontBig = await Jimp.loadFont("src/assets/font/arial-big.ttf.fnt");
  const fontMedium = await Jimp.loadFont(
    "src/assets/font/arial-medium.ttf.fnt"
  );
  const fontSmall = await Jimp.loadFont("src/assets/font/arial-small.ttf.fnt");

  const fullWidth = image.getWidth();
  const fullHeight = image.getHeight();

  const nameWidth = Jimp.measureText(fontBig, "dummy");
  const nameX = fullWidth / 2 - nameWidth / 2;
  const nameY = 209;

  const imageFileName = "dummy.png";

  await image
    .print(fontBig, nameX, nameY, "dummy")
    .quality(60)
    .writeAsync("uploads/" + imageFileName);

  //   image.resize(842, 595);
};

exports.generateCertificate = generateCertificate;
