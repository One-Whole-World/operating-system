import express from "express";
const mappingController = require("../controllers/mappingController");
const router = express.Router();

router.post("/", mappingController.createMapping);
router.get("/:id", mappingController.getMapping);
router.patch("/:id/status", mappingController.updateMappingStatus);
router.get("/need/:needId", mappingController.getMappingsForNeed);
router.get(
  "/fulfillerSystem/:fulfillerSystemId",
  mappingController.getMappingsByFulfillerSystem
);

module.exports = router;
