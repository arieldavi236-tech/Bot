import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "animes",
  description: "Mostra vários resultados de anime.",
  commands: ["animes"],
  usage: `${PREFIX}animes <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}animes Naruto`);

    const list = await getAnimeResults(fullArgs.trim(), 5);
    if (!list.length) throw new InvalidParameterError("Nenhum anime encontrado.");

    await sendReply(
      list.map((a, i) => `🎌 ${i + 1}. ${a.title?.english || a.title?.romaji || a.title?.native || "?"}`).join("\n")
    );
  },
};