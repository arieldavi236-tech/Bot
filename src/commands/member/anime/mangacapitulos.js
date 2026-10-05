import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getManga } from "../../../utils/anime/api.js";

export default {
  name: "mangacapitulos",
  description: "Mostra a quantidade de capítulos.",
  commands: ["mangacapitulos"],
  usage: `${PREFIX}mangacapitulos <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}mangacapitulos One Piece`);
    }

    const m = await getManga(fullArgs.trim());

    if (!m) {
      throw new InvalidParameterError("Mangá não encontrado.");
    }

    const titulo = m.title?.english || m.title?.romaji || m.title?.native || "?";

    await sendReply(
      `📚 *${titulo}*\n📖 Capítulos: ${m.chapters ?? "Não informado"}`
    );
  },
};