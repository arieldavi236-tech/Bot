import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "tagmembros",
  description: "Marca somente os membros comuns do grupo.",
  commands: ["tagmembros", "tagmembro"],
  usage: `${PREFIX}tagmembros mensagem`,
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
      throw new WarningError("Digite uma mensagem para marcar os membros.");
    }

    const { participants } = await socket.groupMetadata(remoteJid);

    const members = participants.filter(
      (participant) =>
        participant.admin !== "admin" &&
        participant.admin !== "superadmin"
    );

    if (!members.length) {
      throw new WarningError("Não encontrei membros comuns no grupo.");
    }

    const mentions = members.map(({ id }) => id);

    const lista = members
      .map(({ id }) => `@${id.split("@")[0].split(":")[0]}`)
      .join("\n");

    await sendReact("📢");
    await sendText(`📢 ${fullArgs}\n\n${lista}`, mentions);
  },
};
