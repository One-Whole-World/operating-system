const logService = require("../services/logService");

const getAllLogs = async (req: any, res: any) => {
  try {
    const logs = await logService.getAllLogs();
    res.status(200).json(logs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLogs,
};
