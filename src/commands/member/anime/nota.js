import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime } from "../../../utils/anime/api.js";

export default {
  name: "nota",
  description: "Mostra a nota de um anime.",
  commands: ["nota"],
  usage: `${PREFIX}nota <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}nota Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    const nota = a.averageScore != null ? `${a.averageScore}/100` : "Não informada";

    await sendReply(`⭐ *${titulo}*\nNota: ${nota}`);
  },
};