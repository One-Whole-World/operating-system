const prisma = require("../utils/prisma");
const { createLog } = require("./logService");

export const createMapping = async (
  needId: any,
  fulfillerSystemId: any,
  fulfillerAvatarId = null,
  notes = null
) => {
  const mapping = await prisma.mapping.create({
    data: {
      needId,
      fulfillerSystemId,
      fulfillerAvatarId,
      notes,
      status: "PENDING",
    },
  });
  await createLog(
    "MAPPING_CREATED",
    `Mapping created for Need ID: ${needId} by Fulfiller System ID: ${fulfillerSystemId}`,
    mapping.id,
    { needId, fulfillerSystemId, fulfillerAvatarId }
  );
  return mapping;
};

const getMappingById = async (id: any) => {
  return await prisma.mapping.findUnique({
    where: { id },
    include: { need: true, fulfillerSystem: true, fulfillerAvatar: true },
  });
};

const updateMappingStatus = async (id: any, status: any, notes = null) => {
  const mapping = await prisma.mapping.update({
    where: { id },
    data: { status, notes },
  });
  await createLog(
    "MAPPING_STATUS_UPDATED",
    `Mapping ID: ${id} status updated to: ${status}`,
    mapping.id,
    { oldStatus: mapping.status, newStatus: status }
  );
  return mapping;
};

const getMappingsByNeedId = async (needId: any) => {
  return await prisma.mapping.findMany({
    where: { needId },
    include: { fulfillerSystem: true, fulfillerAvatar: true },
  });
};

const getMappingsByFulfillerSystemId = async (fulfillerSystemId: any) => {
  return await prisma.mapping.findMany({
    where: { fulfillerSystemId },
    include: {
      need: {
        include: {
          goal: { include: { avatar: { include: { system: true } } } },
        },
      },
      fulfillerAvatar: true,
    },
  });
};

module.exports = {
  createMapping,
  getMappingById,
  updateMappingStatus,
  getMappingsByNeedId,
  getMappingsByFulfillerSystemId,
};
