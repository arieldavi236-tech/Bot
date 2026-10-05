import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime } from "../../../utils/anime/api.js";

export default {
  name: "generoanime",
  description: "Mostra os gêneros de um anime.",
  commands: ["generoanime"],
  usage: `${PREFIX}generoanime <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}generoanime Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    await sendReply(`🎌 *${titulo}*\n🏷️ Gêneros: ${a.genres?.join(", ") || "Não informado"}`);
  },
};