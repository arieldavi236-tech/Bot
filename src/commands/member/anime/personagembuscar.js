import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getCharacterResults } from "../../../utils/anime/api.js";

export default {
  name: "personagembuscar",
  description: "Busca personagens pelo nome.",
  commands: ["personagembuscar"],
  usage: `${PREFIX}personagembuscar <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}personagembuscar Naruto`);
    }

    const list = await getCharacterResults(fullArgs.trim(), 10);

    if (!list.length) {
      throw new InvalidParameterError("Nenhum personagem encontrado.");
    }

    const linhas = [
      "╭━━━「 👤 PERSONAGENS 」━━━╮",
      ...list.map((c, i) =>
        `┃ ${i + 1}. ${c.name?.full || c.name?.native || "?"}`
      ),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};