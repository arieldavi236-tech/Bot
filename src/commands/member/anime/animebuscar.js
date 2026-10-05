import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "animebuscar",
  description: "Pesquisa vários animes.",
  commands: ["animebuscar"],
  usage: `${PREFIX}animebuscar <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(
        `Use: ${PREFIX}animebuscar Naruto`
      );
    }

    const list = await getAnimeResults(fullArgs.trim(), 5);

    if (!list.length) {
      throw new InvalidParameterError("Nenhum anime encontrado.");
    }

    const texto = [
      "╭━━━「 🎌 アニメ SEARCH 」━━━╮",
      ...list.map((a, i) => {
        const titulo =
          a.title?.english ||
          a.title?.romaji ||
          a.title?.native ||
          "?";

        const nota =
          a.averageScore != null
            ? a.averageScore
            : "?";

        const ano = a.seasonYear || "?";

        return `┃ ${i + 1}. ${titulo} • ${ano} • ⭐ ${nota}`;
      }),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n");

    await sendReply(texto);
  },
};
