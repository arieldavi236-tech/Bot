import axios from "axios";

export default {
  name: "animealeatorio",
  description: "Escolhe um anime aleatório.",
  commands: ["animealeatorio"],
  usage: "!animealeatorio",
  handle: async ({ sendReply, sendImageFromURL }) => {
    const { data } = await axios.get("https://api.jikan.moe/v4/random/anime", {
      timeout: 15000,
    });

    const a = data?.data;
    if (!a) return sendReply("Não consegui sortear um anime agora.");

    const image = a.images?.jpg?.large_image_url || a.images?.jpg?.image_url;
    const texto = `🎌 Anime aleatório: ${a.title}\n⭐ Nota: ${a.score ?? "?"}`;

    if (image) await sendImageFromURL(image, texto);
    else await sendReply(texto);
  },
};
