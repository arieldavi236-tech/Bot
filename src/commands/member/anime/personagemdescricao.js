import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getCharacter, clean } from "../../../utils/anime/api.js";

export default {
  name: "personagemdescricao",
  description: "Mostra a descrição de um personagem.",
  commands: ["personagemdescricao"],
  usage: `${PREFIX}personagemdescricao <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(`Use: ${PREFIX}personagemdescricao Goku`);
    }

    const c = await getCharacter(fullArgs.trim());

    if (!c) {
      throw new InvalidParameterError("Personagem não encontrado.");
    }

    const desc = clean(c.description || "Descrição não disponível.");

    await sendReply(desc.slice(0, 1500));
  },
};