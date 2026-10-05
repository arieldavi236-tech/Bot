import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime } from "../../../utils/anime/api.js";

export default {
  name: "statusanime",
  description: "Mostra o status de um anime.",
  commands: ["statusanime"],
  usage: `${PREFIX}statusanime <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}statusanime Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    await sendReply(`🎌 *${titulo}*\n📌 Status: ${a.status || "Não informado"}`);
  },
};