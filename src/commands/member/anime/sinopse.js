import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, clean } from "../../../utils/anime/api.js";

export default {
  name: "sinopse",
  description: "Mostra a sinopse de um anime.",
  commands: ["sinopse"],
  usage: `${PREFIX}sinopse <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}sinopse Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    const desc = clean(a.description || "Sinopse não disponível.");

    await sendReply(
      ["╭━━━「 📖 SINOPSE 」━━━╮", `┃ ✦ ${titulo}`, "", desc.slice(0, 1200), "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"].join("\n")
    );
  },
};