const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  keyFilename: "./config/potent-impulse-406110-22f09b171f82.json",
});

const bucket = storage.bucket("sikonsul-profil-pic");

module.exports = { bucket };
