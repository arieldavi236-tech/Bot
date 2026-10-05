import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, imageOf } from "../../../utils/anime/api.js";
import { createSticker } from "../../../services/sticker.js";

export default {
  name: "stickeranime",
  description: "Cria uma figurinha com imagem de anime.",
  commands: ["stickeranime"],
  usage: `${PREFIX}stickeranime <anime>`,
  handle: async ({ fullArgs, sendImageFromURL, ...paramsHandler }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}stickeranime Naruto`);
    const a = await getAnime(fullArgs.trim());
    const image = imageOf(a);
    if (!image) throw new InvalidParameterError("Imagem não encontrada.");

    await sendImageFromURL(image, `🎴 ${a.title}`);
  },
};
