import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "tagadm",
  description: "Marca somente os administradores do grupo.",
  commands: ["tagadm", "tagadms"],
  usage: `${PREFIX}tagadm mensagem`,
  handle: async ({
    fullArgs,
    socket,
    remoteJid,
    isGroup,
    sendText,
    sendReact,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!fullArgs) {
      throw new WarningError("Digite uma mensagem para marcar os administradores.");
    }

    const { participants } = await socket.groupMetadata(remoteJid);

    const admins = participants.filter(
      (participant) =>
        participant.admin === "admin" ||
        participant.admin === "superadmin"
    );

    if (!admins.length) {
      throw new WarningError("Não encontrei administradores no grupo.");
    }

    const mentions = admins.map(({ id }) => id);

    const lista = admins
      .map(({ id }) => `@${id.split("@")[0].split(":")[0]}`)
      .join("\n");

    await sendReact("👑");
    await sendText(`👑 ${fullArgs}\n\n${lista}`, mentions);
  },
};
