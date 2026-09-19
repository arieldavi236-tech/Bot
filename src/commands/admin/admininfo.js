import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "admininfo",
  description: "Mostra informações administrativas do grupo.",
  commands: ["admininfo", "infoadmin"],
  usage: `${PREFIX}admininfo`,
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
    const { subject, participants, owner } = metadata;

    const admins = participants.filter(
      (participant) =>
        participant.admin === "admin" ||
        participant.admin === "superadmin"
    );

    const donos = admins.filter(
      (participant) => participant.admin === "superadmin"
    );

    const textoAdmins = admins.length
      ? admins
          .map(
            (participant, index) =>
              `${index + 1}. @${participant.id.split("@")[0].split(":")[0]}`
          )
          .join("\n")
      : "Nenhum administrador identificado.";

    await sendReact("👑");

    await sendReply(
      `✦ ── *INFORMAÇÕES ADM* ── ✦\n\n` +
        `🏷️ *Grupo:* ${subject || "Sem nome"}\n` +
        `👥 *Membros:* ${participants.length}\n` +
        `👑 *Administradores:* ${admins.length}\n` +
        `♛ *Dono:* ${owner ? `@${owner.split("@")[0].split(":")[0]}` : "Não identificado"}\n\n` +
        `╰─ ✧ *EQUIPE ADM*\n${textoAdmins}`
    );
  },
};
