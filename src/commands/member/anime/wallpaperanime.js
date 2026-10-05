import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnime, getAnimePictures } from "../../../utils/anime/api.js";

export default {
  name: "wallpaperanime",
  description: "Envia uma imagem do anime para wallpaper.",
  commands: ["wallpaperanime"],
  usage: `${PREFIX}wallpaperanime <anime>`,
  handle: async ({ fullArgs, sendImageFromURL }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}wallpaperanime Naruto`);
    const a = await getAnime(fullArgs.trim());
    if (!a) throw new InvalidParameterError("Anime não encontrado.");

    const pics = await getAnimePictures(a.mal_id);
    const pic = pics[Math.floor(Math.random() * pics.length)];
    const image = pic?.jpg?.large_image_url || pic?.jpg?.image_url;

    if (!image) throw new InvalidParameterError("Não encontrei uma imagem.");
    await sendImageFromURL(image, `🖼️ 𝑾𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓 • ${a.title}`);
  },
};
