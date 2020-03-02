const Jimp = require('jimp');
const { resolve } = require('path');
const { parse } = require('url');

const assetsDirectory = resolve(__dirname, '..', 'assets');

module.exports = {
  async composite(image, composition, {
    size = [0, 0],
    position = [0, 0],
    invertBase = false,
    mime = 'png'
  } = {}) {
    composition = !parse(composition).slashes ? resolve(assetsDirectory, composition) : composition;

    const [baseImage, compositionImage] = await this.read([image, composition]);

    size = !isNaN(size) ? [size, Jimp.AUTO] : size;

    baseImage.resize(...size);

    if (!invertBase) {
      baseImage.composite(compositionImage, ...position);
      return baseImage.getBufferAsync(this._setMIME(mime));
    } else {
      compositionImage.composite(baseImage, ...position);
      return compositionImage.getBufferAsync(this._setMIME(mime));
    }
  },

  _setMIME(mime) {
    return {
      png: Jimp.MIME_PNG,
      jpg: Jimp.MIME_JPEG,
      bmp: Jimp.MIME_BMP
    }[mime] || Jimp.AUTO;
  },

  read(images) {
    return Promise.all(images.map((image) => {
      return new Promise((resolve) => {
        return Jimp.read(image)
          .then((image) => resolve(image));
      });
    }));
  }
};