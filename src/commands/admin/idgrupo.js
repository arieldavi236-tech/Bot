import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "idgrupo",
  description: "Mostra o ID do grupo atual.",
  commands: ["idgrupo", "groupid"],
  usage: `${PREFIX}idgrupo`,
  handle: async ({
    remoteJid,
    isGroup,
    sendReply,
    sendReact,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    await sendReact("🆔");
    await sendReply(`🆔 *ID DO GRUPO*\n\n\`${remoteJid}\``);
  },
};
