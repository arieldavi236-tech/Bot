import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, clean } from "../../../utils/anime/api.js";

export default {
  name: "animeinfo",
  description: "Mostra informações completas do anime.",
  commands: ["animeinfo"],
  usage: `${PREFIX}animeinfo <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}animeinfo Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";
    const linhas = [
      "╭━━━「 🎌 ANIME INFO 」━━━╮",
      `┃ ✦ Título: ${titulo}`,
      `┃ ✦ Episódios: ${a.episodes ?? "?"}`,
      `┃ ✦ Status: ${a.status || "?"}`,
      `┃ ✦ Nota: ${a.averageScore ?? "?"}/100`,
      `┃ ✦ Gêneros: ${a.genres?.join(", ") || "?"}`,
      `┃ ✦ Ano: ${a.seasonYear || "?"}`,
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    const desc = clean(a.description || "");
    if (desc) linhas.push("", `📖 ${desc.slice(0, 700)}`);

    await sendReply(linhas.join("\n"));
  },
};