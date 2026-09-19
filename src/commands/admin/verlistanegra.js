import { PREFIX } from "../../config.js";
import {
  listBlacklistMembers,
} from "../../utils/database.js";

export default {
  name: "verlistanegra",
  description: "Mostra os membros da lista negra.",
  commands: [
    "verlistanegra",
    "ver-lista-negra",
    "blacklist"
  ],
  usage: `${PREFIX}verlistanegra`,
  handle: async ({
    remoteJid,
    sendReply,
    sendReact,
  }) => {
    const members = listBlacklistMembers(remoteJid);

    if (!members.length) {
      await sendReact("📋");
      await sendReply(
        "🚫 A Lista Negra deste grupo está vazia."
      );
      return;
    }

    const lista = members
      .map(
        (member, index) =>
          `${index + 1}. @${member.split("@")[0]}`
      )
      .join("\n");

    await sendReact("🚫");

    await sendReply(
      `🚫 *LISTA NEGRA DO GRUPO*\n\n${lista}`,
      members
    );
  },
};
