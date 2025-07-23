const prisma = require("../utils/prisma");
const { createLog } = require("./logService");

export const createSystem = async (name: any, type: any) => {
  const system = await prisma.system.create({
    data: {
      name,
      type,
    },
  });
  await createLog(
    "SYSTEM_CREATED",
    `System "${name}" (${type}) created with ID: ${system.id}`,
    system.id
  );
  return system;
};

const getSystemById = async (id: any) => {
  return await prisma.system.findUnique({
    where: { id },
    include: { avatars: true },
  });
};

const getAllSystems = async () => {
  return await prisma.system.findMany({
    include: { avatars: true },
  });
};

module.exports = {
  createSystem,
  getSystemById,
  getAllSystems,
};
