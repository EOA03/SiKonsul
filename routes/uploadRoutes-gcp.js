const express = require("express");
const multer = require("multer");
const { bucket } = require("../config/googleCloudStorage");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post(
  "/profilePicture",
  upload.single("file"),
  authMiddleware,

  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    console.log(req.user.role);

    const identifier = req.user.role === "LAWYER" ? "lawyerId" : "userId";
    const idValue = req.user[identifier];

    console.log(idValue);

    const blob = bucket.file(`profile-pictures/${idValue}-${Date.now()}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.error("Error uploading file:", error);
      res.status(500).send("Error uploading file!");
    });

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      try {
        const modelToUpdate =
          req.user.role === "LAWYER" ? prisma.lawyer : prisma.user;
        const updatedProfile = await modelToUpdate.update({
          where: { id: idValue },
          data: { profilePictureUrl: publicUrl },
        });

        res.status(200).send({ imageUrl: publicUrl });
      } catch (error) {
        console.error("Failed to update profile picture URL:", error);
        res
          .status(500)
          .send("Failed to update profile picture URL in the database.");
      }
    });

    blobStream.end(req.file.buffer);
  }
);

module.exports = router;
