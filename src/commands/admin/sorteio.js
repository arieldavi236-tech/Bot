import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "sorteio",
  description: "Sorteia um participante do grupo.",
  commands: ["sorteio", "sortear"],
  usage: `${PREFIX}sorteio`,
  handle: async ({
    socket,
    remoteJid,
    isGroup,
    sendText,
    sendReact,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const { participants } = await socket.groupMetadata(remoteJid);

    if (!participants?.length) {
      throw new WarningError("Não foi possível encontrar os membros do grupo.");
    }

    const vencedor =
      participants[Math.floor(Math.random() * participants.length)];

    const mention = vencedor.id;
    const nome = `@${vencedor.id.split("@")[0].split(":")[0]}`;

    await sendReact("🎉");
    await sendText(
      `🎉 *SORTEIO DO GRUPO*\n\n🏆 Participante sorteado:\n${nome}`,
      [mention]
    );
  },
};
