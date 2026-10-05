import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getSeasonAnime } from "../../../utils/anime/api.js";
import { getAnimeTitle } from "../../../utils/anime/titles.js";
export default {

  name: "temporada",
  description: "Mostra os animes de uma temporada.",
  commands: ["temporada"],
  usage: `${PREFIX}temporada [ano] [winter/spring/summer/fall]`,
  handle: async ({ fullArgs, sendReply }) => {
    const args = fullArgs?.trim().split(/\s+/) || [];

    const now = new Date();

    const ano = Number(args[0]) || now.getFullYear();

    const seasonAtual =
      now.getMonth() < 2 ? "winter" :
      now.getMonth() < 5 ? "spring" :
      now.getMonth() < 8 ? "summer" :
      "fall";

    const season = (args[1] || seasonAtual).toLowerCase();

    const temporadas = ["winter", "spring", "summer", "fall"];

    if (!temporadas.includes(season)) {
      throw new InvalidParameterError(
        `Temporada inválida. Use: winter, spring, summer ou fall.`
      );
    }

    const list = await getSeasonAnime(ano, season, 10);

    if (!list.length) {
      throw new InvalidParameterError(
        "Nenhum anime encontrado nessa temporada."
      );
    }

    const nomes = {
      winter: "❄️ WINTER",
      spring: "🌸 SPRING",
      summer: "☀️ SUMMER",
      fall: "🍂 FALL",
    };

    await sendReply([
      `╭━━━「 季節 • TEMPORADA 」━━━╮`,
      `┃ ✦ ${nomes[season]} ${ano}`,
      ...list.map((a, i) => {
        const titulo = getAnimeTitle(a.title);

        return `┃ ${i + 1}. ${titulo}`;
      }),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n"));
  },
};
