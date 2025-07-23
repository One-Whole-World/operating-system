import express from "express";
const systemController = require("../controllers/systemController");
const router = express.Router();

router.post("/", systemController.createSystem);
router.get("/:id", systemController.getSystem);
router.get("/", systemController.getAllSystems);

module.exports = router;
