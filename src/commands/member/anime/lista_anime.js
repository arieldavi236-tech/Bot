import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "lista_anime",
  description: "Lista resultados de animes.",
  commands: ["lista_anime"],
  usage: `${PREFIX}lista_anime <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}lista_anime One Piece`);

    const list = await getAnimeResults(fullArgs.trim(), 10);
    if (!list.length) throw new InvalidParameterError("Nenhum resultado encontrado.");

    await sendReply(
      list.map((a, i) => `${i + 1}. ${a.title?.english || a.title?.romaji || a.title?.native || "?"}`).join("\n")
    );
  },
};