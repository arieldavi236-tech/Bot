import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getCharacter, clean } from "../../../utils/anime/api.js";

export default {
  name: "personageminfo",
  description: "Mostra informações de um personagem.",
  commands: ["personageminfo"],
  usage: `${PREFIX}personageminfo <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}personageminfo Naruto`);
    }

    const c = await getCharacter(fullArgs.trim());

    if (!c) {
      throw new InvalidParameterError("Personagem não encontrado.");
    }

    const nome = c.name?.full || c.name?.native || "?";
    const desc = clean(c.description || "Descrição não disponível.");

    const linhas = [
      "╭━━━「 👤 PERSONAGEM 」━━━╮",
      `┃ ✦ Nome: ${nome}`,
      "",
      desc.slice(0, 1000),
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
    ];

    await sendReply(linhas.join("\n"));
  },
};