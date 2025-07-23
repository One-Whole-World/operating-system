const avatarService = require("../services/avatarService");

const createAvatar = async (req: any, res: any) => {
  try {
    const { systemId, name } = req.body;
    const avatar = await avatarService.createAvatar(systemId, name);
    res.status(201).json(avatar);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAvatar = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const avatar = await avatarService.getAvatarById(id);
    if (!avatar) {
      return res.status(404).json({ message: "Avatar not found" });
    }
    res.status(200).json(avatar);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getAvatarsForSystem = async (req: any, res: any) => {
  try {
    const { systemId } = req.params;
    const avatars = await avatarService.getAvatarsBySystemId(systemId);
    res.status(200).json(avatars);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAvatar,
  getAvatar,
  getAvatarsForSystem,
};
