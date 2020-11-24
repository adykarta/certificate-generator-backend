const Jimp = require("jimp");

generate = async (img, data) => {
  const image = await Jimp.read(img.path);
  const fontBig = await Jimp.loadFont("src/assets/font/arial-big.ttf.fnt");
  // const fontMedium = await Jimp.loadFont(
  //   "src/assets/font/arial-medium.ttf.fnt"
  // );
  // const fontSmall = await Jimp.loadFont("src/assets/font/arial-small.ttf.fnt");

  // const fullWidth = image.getWidth();
  // const fullHeight = image.getHeight();

  const imageFileName = `${img.filename}.png`;
  data.forEach(async (element) => {
    // const nameWidth = Jimp.measureText(fontBig, element.data.text);
    const nameX = element.data.width;
    const nameY = element.data.height;
    await image.print(fontBig, nameX, nameY, element.data.text).quality(60);
  });

  await image.writeAsync("uploads/" + imageFileName);

  //   image.resize(842, 595);
};

exports.generate = generate;
