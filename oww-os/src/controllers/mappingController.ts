const mappingService = require("../services/mappingService");

const createMapping = async (req: any, res: any) => {
  try {
    const { needId, fulfillerSystemId, fulfillerAvatarId, notes } = req.body;
    const mapping = await mappingService.createMapping(
      needId,
      fulfillerSystemId,
      fulfillerAvatarId,
      notes
    );
    res.status(201).json(mapping);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getMapping = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const mapping = await mappingService.getMappingById(id);
    if (!mapping) {
      return res.status(404).json({ message: "Mapping not found" });
    }
    res.status(200).json(mapping);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const updateMappingStatus = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const updatedMapping = await mappingService.updateMappingStatus(
      id,
      status,
      notes
    );
    res.status(200).json(updatedMapping);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getMappingsForNeed = async (req: any, res: any) => {
  try {
    const { needId } = req.params;
    const mappings = await mappingService.getMappingsByNeedId(needId);
    res.status(200).json(mappings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getMappingsByFulfillerSystem = async (req: any, res: any) => {
  try {
    const { fulfillerSystemId } = req.params;
    const mappings = await mappingService.getMappingsByFulfillerSystemId(
      fulfillerSystemId
    );
    res.status(200).json(mappings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMapping,
  getMapping,
  updateMappingStatus,
  getMappingsForNeed,
  getMappingsByFulfillerSystem,
};
