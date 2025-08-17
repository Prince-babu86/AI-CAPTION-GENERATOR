const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, filename) {
  try {
    const response = await imagekit.upload({
      file: file,
      fileName: filename,
      folder: "AI-PROJECT-1",
    });

    return response;
  } catch (error) {
    console.log(error, "Error uploading file to ImageKit");
  }
}

module.exports = uploadFile;
