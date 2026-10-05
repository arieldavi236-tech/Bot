import axios from "axios";

export default {
  name: "personagemaleatorio",
  description: "Escolhe um personagem aleatório.",
  commands: ["personagemaleatorio"],
  usage: "!personagemaleatorio",
  handle: async ({ sendReply, sendImageFromURL }) => {
    const { data } = await axios.get("https://api.jikan.moe/v4/random/characters", {
      timeout: 15000,
    });

    const c = data?.data;
    if (!c) return sendReply("Não consegui sortear um personagem agora.");

    const image =
      c.images?.jpg?.large_image_url ||
      c.images?.jpg?.image_url;

    if (image) await sendImageFromURL(image, `✦ キャラ aleatório: ${c.name}`);
    else await sendReply(`✦ キャラ aleatório: ${c.name}`);
  },
};
