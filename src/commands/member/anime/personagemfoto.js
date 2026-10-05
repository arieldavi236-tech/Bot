import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getCharacter, imageOf } from "../../../utils/anime/api.js";

export default {
  name: "personagemfoto",
  description: "Envia uma imagem do personagem.",
  commands: ["personagemfoto"],
  usage: `${PREFIX}personagemfoto <personagem>`,
  handle: async ({ fullArgs, sendImageFromURL }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}personagemfoto Naruto`);
    const c = await getCharacter(fullArgs.trim());
    const image = imageOf(c);
    if (!image) throw new InvalidParameterError("Imagem não encontrada.");
    await sendImageFromURL(image, `✦ キャラ • ${c.name}`);
  },
};
