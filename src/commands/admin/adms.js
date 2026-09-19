import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "adms",
  description: "Mostra os administradores do grupo.",
  commands: ["adms", "admins", "administradores"],
  usage: `${PREFIX}adms`,
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
      (participant) => participant.admin === "admin" || participant.admin === "superadmin"
    );

    const texto = admins
      .map((participant, index) =>
        `${index + 1}. @${participant.id.split("@")[0].split(":")[0]}`
      )
      .join("\n");

    await sendReact("👑");
    await sendReply(`👑 *ADMINISTRADORES DO GRUPO*\n\n${texto}`);
  },
};
