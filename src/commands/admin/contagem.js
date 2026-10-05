import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "contagem",
  description: "Mostra a quantidade de membros e administradores.",
  commands: ["contagem", "contar"],
  usage: `${PREFIX}contagem`,
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

    const { participants } = await socket.groupMetadata(remoteJid);

    const admins = participants.filter(
      (participant) =>
        participant.admin === "admin" ||
        participant.admin === "superadmin"
    );

    const membros = participants.length - admins.length;

    await sendReact("📊");
    await sendReply(
      `📊 *CONTAGEM DO GRUPO*\n\n` +
        `👥 Total: *${participants.length}*\n` +
        `👑 Administradores: *${admins.length}*\n` +
        `👤 Membros: *${membros}*`
    );
  },
};
