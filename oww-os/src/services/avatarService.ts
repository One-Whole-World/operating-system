const prisma = require("../utils/prisma");
const { createLog } = require("./logService");

export const createAvatar = async (systemId: any, name: any) => {
  const avatar = await prisma.avatar.create({
    data: {
      systemId,
      name,
    },
  });

  await createLog(
    "AVATAR_CREATED",
    `Avatar "${name}" created for System ID: ${systemId} with ID: ${avatar.id}`,
    avatar.id,
    { systemId }
  );

  return avatar;
};

export const getAvatarById = async (id: any) => {
  return await prisma.avatar.findUnique({
    where: { id },
    include: { system: true, goals: true },
  });
};

export const getAvatarsBySystemId = async (systemId: any) => {
  return await prisma.avatar.findMany({
    where: { systemId },
    include: { goals: true },
  });
};
