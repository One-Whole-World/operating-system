import express from "express";
const avatarController = require("../controllers/avatarController");
const router = express.Router();

router.post("/", avatarController.createAvatar);
router.get("/:id", avatarController.getAvatar);
router.get("/system/:systemId", avatarController.getAvatarsForSystem);

module.exports = router;
