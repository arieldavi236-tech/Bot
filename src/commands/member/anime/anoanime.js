import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime } from "../../../utils/anime/api.js";

export default {
  name: "anoanime",
  description: "Mostra o ano e a temporada.",
  commands: ["anoanime"],
  usage: `${PREFIX}anoanime <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}anoanime Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    await sendReply(`🎌 *${titulo}*\n📅 Ano: ${a.seasonYear || "Não informado"}\n🌸 Temporada: ${a.season || "Não informada"}`);
  },
};