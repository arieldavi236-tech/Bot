import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getManga } from "../../../utils/anime/api.js";

export default {
  name: "manganota",
  description: "Mostra a nota de um mangá.",
  commands: ["manganota"],
  usage: `${PREFIX}manganota <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}manganota One Piece`);
    }

    const m = await getManga(fullArgs.trim());

    if (!m) {
      throw new InvalidParameterError("Mangá não encontrado.");
    }

    const titulo = m.title?.english || m.title?.romaji || m.title?.native || "?";
    const nota =
      m.averageScore != null
        ? `${m.averageScore}/100`
        : "Não informada";

    await sendReply(`📚 *${titulo}*\n⭐ Nota: ${nota}`);
  },
};