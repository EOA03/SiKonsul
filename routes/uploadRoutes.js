const express = require("express");
const multer = require("multer");
const { bucket } = require("../config/firebase");
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post(
  "/profilePicture",
  authMiddleware,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const blob = bucket.file(
      `profile-pictures/${req.user.userId}-${Date.now()}`
    );
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    blobStream.on("error", (error) =>
      res.status(500).send("Error uploading file!")
    );

    blobStream.on("finish", async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      try {
        await prisma.user.update({
          where: { id: req.user.userId },
          data: { profilePictureUrl: publicUrl },
        });

        res.status(200).send({ imageUrl: publicUrl });
      } catch (error) {
        console.error("Failed to update user profile picture URL:", error);
        res
          .status(500)
          .send("Failed to update profile picture URL in the database.");
      }
    });

    blobStream.end(req.file.buffer);
  }
);

module.exports = router;
