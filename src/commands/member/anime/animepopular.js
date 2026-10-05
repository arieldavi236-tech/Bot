import { InvalidParameterError } from "../../../errors/index.js";
import { getSeasonAnime } from "../../../utils/anime/api.js";

export default {
  name: "animepopular",
  description: "Mostra animes populares da temporada.",
  commands: ["animepopular"],
  usage: "!animepopular",
  handle: async ({ sendReply }) => {
    const now = new Date();
    const month = now.getMonth();
    const season =
      month < 2 ? "winter" :
      month < 5 ? "spring" :
      month < 8 ? "summer" : "fall";

    const list = await getSeasonAnime(now.getFullYear(), season, 10);

    if (!list.length) {
      throw new InvalidParameterError("Nenhum anime popular encontrado.");
    }

    const linhas = [
      "╭━━━「 🔥 ANIMES POPULARES 」━━━╮",
      ...list.map((a, i) =>
        `┃ ${i + 1}. ${a.title?.english || a.title?.romaji || a.title?.native || "?"}`
      ),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};