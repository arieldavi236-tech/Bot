import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, imageOf } from "../../../utils/anime/api.js";

export default {
  name: "animefoto",
  description: "Envia uma imagem do anime.",
  commands: ["animefoto"],
  usage: `${PREFIX}animefoto <anime>`,
  handle: async ({ fullArgs, sendImageFromURL }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(
        `Use: ${PREFIX}animefoto Naruto`
      );
    }

    const a = await getAnime(fullArgs.trim());

    if (!a) {
      throw new InvalidParameterError("Anime não encontrado.");
    }

    const image = imageOf(a);

    if (!image) {
      throw new InvalidParameterError("Imagem não encontrada.");
    }

    const titulo =
      a.title?.english ||
      a.title?.romaji ||
      a.title?.native ||
      "Anime";

    await sendImageFromURL(
      image,
      `🎌 ${titulo}`
    );
  },
};
