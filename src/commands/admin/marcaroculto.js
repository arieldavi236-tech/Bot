import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "marcaroculto",
  description: "Marca todos sem mostrar a lista de membros.",
  commands: ["marcaroculto", "marcar-oculto", "hidetag"],
  usage: `${PREFIX}marcaroculto mensagem`,
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
      throw new WarningError("Digite uma mensagem.");
    }

    const { participants } = await socket.groupMetadata(remoteJid);
    const mentions = participants.map(({ id }) => id);

    await sendReact("📢");
    await sendText(fullArgs, mentions);
  },
};
