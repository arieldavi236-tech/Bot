import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, getAnimePictures } from "../../../utils/anime/api.js";

export default {
  name: "fanart",
  description: "Envia uma imagem aleatória relacionada ao anime.",
  commands: ["fanart"],
  usage: `${PREFIX}fanart <anime>`,
  handle: async ({ fullArgs, sendImageFromURL }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}fanart Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const pics = await getAnimePictures(a.mal_id);
    const pic = pics[Math.floor(Math.random() * pics.length)];
    const image = pic?.jpg?.large_image_url || pic?.jpg?.image_url;

    if (!image) throw new InvalidParameterError("Imagem não encontrada.");
    await sendImageFromURL(image, `🎨 𝑭𝒂𝒏𝒂𝒓𝒕 • ${a.title}`);
  },
};
