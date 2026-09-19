import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "marcartodos",
  description: "Marca todos os membros do grupo.",
  commands: ["marcartodos", "marcar-todos", "tagall"],
  usage: `${PREFIX}marcartodos mensagem`,
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
      throw new WarningError("Digite uma mensagem para marcar todos.");
    }

    const { participants } = await socket.groupMetadata(remoteJid);
    const mentions = participants.map(({ id }) => id);

    const lista = participants
      .map(({ id }) => `@${id.split("@")[0].split(":")[0]}`)
      .join("\n");

    await sendReact("📢");
    await sendText(`📢 ${fullArgs}\n\n${lista}`, mentions);
  },
};
