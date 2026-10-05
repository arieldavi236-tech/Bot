import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getMangaResults } from "../../../utils/anime/api.js";

export default {
  name: "mangabuscar",
  description: "Busca mangás pelo nome.",
  commands: ["mangabuscar"],
  usage: `${PREFIX}mangabuscar <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}mangabuscar One Piece`);
    }

    const list = await getMangaResults(fullArgs.trim(), 10);

    if (!list.length) {
      throw new InvalidParameterError("Mangá não encontrado.");
    }

    const linhas = [
      "╭━━━「 📚 BUSCA MANGÁ 」━━━╮",
      ...list.map((m, i) =>
        `┃ ${i + 1}. ${m.title?.english || m.title?.romaji || m.title?.native || "?"}`
      ),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};