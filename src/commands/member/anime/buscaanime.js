import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "buscaanime",
  description: "Busca vários animes pelo nome.",
  commands: ["buscaanime"],
  usage: `${PREFIX}buscaanime <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}buscaanime Naruto`);

    const list = await getAnimeResults(fullArgs.trim(), 10);
    if (!list.length) throw new InvalidParameterError("Nenhum anime encontrado.");

    const linhas = [
      "╭━━━「 🔎 BUSCA ANIME 」━━━╮",
      ...list.map((a, i) => `┃ ${i + 1}. ${a.title?.english || a.title?.romaji || a.title?.native || "?"}`),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};