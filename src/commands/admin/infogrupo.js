import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "infogrupo",
  description: "Mostra informações do grupo.",
  commands: ["infogrupo", "info-grupo", "grupoinfo"],
  usage: `${PREFIX}infogrupo`,
  handle: async ({
    socket,
    remoteJid,
    isGroup,
    sendReply,
    sendReact,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const metadata = await socket.groupMetadata(remoteJid);

    const total = metadata.participants.length;

    const admins = metadata.participants.filter(
      (participant) =>
        participant.admin === "admin" ||
        participant.admin === "superadmin"
    ).length;

    await sendReact("ℹ️");

    await sendReply(
      `ℹ️ *INFORMAÇÕES DO GRUPO*\n\n` +
      `📛 Nome: ${metadata.subject}\n` +
      `👥 Membros: ${total}\n` +
      `👑 Administradores: ${admins}\n` +
      `📝 Descrição: ${metadata.desc || "Sem descrição"}`
    );
  },
};
