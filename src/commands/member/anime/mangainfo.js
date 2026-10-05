import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getManga } from "../../../utils/anime/api.js";

export default {
  name: "mangainfo",
  description: "Mostra informações de um mangá.",
  commands: ["mangainfo"],
  usage: `${PREFIX}mangainfo <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}mangainfo One Piece`);
    }

    const m = await getManga(fullArgs.trim());

    if (!m) {
      throw new InvalidParameterError("Mangá não encontrado.");
    }

    const titulo = m.title?.english || m.title?.romaji || m.title?.native || "?";

    const linhas = [
      "╭━━━「 📚 MANGÁ INFO 」━━━╮",
      `┃ ✦ Título: ${titulo}`,
      `┃ ✦ Capítulos: ${m.chapters ?? "?"}`,
      `┃ ✦ Volumes: ${m.volumes ?? "?"}`,
      `┃ ✦ Status: ${m.status || "?"}`,
      `┃ ✦ Nota: ${m.averageScore ?? "?"}/100`,
      `┃ ✦ Gêneros: ${m.genres?.join(", ") || "?"}`,
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};