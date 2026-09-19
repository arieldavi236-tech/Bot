import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "membros",
  description: "Mostra a quantidade de membros do grupo.",
  commands: ["membros", "quantidade", "qtdmembros"],
  usage: `${PREFIX}membros`,
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

    await sendReact("👥");

    await sendReply(
      `👥 *MEMBROS DO GRUPO*\n\n` +
      `📊 Quantidade atual: *${participants.length} membros*`
    );
  },
};
