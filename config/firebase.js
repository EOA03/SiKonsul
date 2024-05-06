const admin = require("firebase-admin");

const serviceAccount = require("./sikonsul-firebase-adminsdk-14lg9-f18b5d8abd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET_URL,
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
