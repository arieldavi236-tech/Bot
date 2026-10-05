import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime } from "../../../utils/anime/api.js";

export default {
  name: "episodios",
  description: "Mostra a quantidade de episódios.",
  commands: ["episodios"],
  usage: `${PREFIX}episodios <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}episodios Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    await sendReply(`🎌 *${titulo}*\n📺 Episódios: ${a.episodes ?? "Não informado"}`);
  },
};