import { getCharacterResults, imageOf } from "../../../utils/anime/api.js";

export default {
  name: "quem-e",
  description: "Mostra um personagem para você tentar adivinhar.",
  commands: ["quem-e", "queme"],
  usage: "!quem-e",
  handle: async ({ sendReply, sendImageFromURL }) => {
    const list = await getCharacterResults("a", 10);
    const c = list[Math.floor(Math.random() * list.length)];
    if (!c) return sendReply("Não consegui sortear um personagem agora.");

    const image = imageOf(c);

    if (image) {
      await sendImageFromURL(
        image,
        "╭━━━「 ❓ QUEM É? 」━━━╮\n┃ ✦ Descubra o personagem!\n┃ ✦ Não vale pesquisar 😎\n╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
      );
    } else {
      await sendReply(`❓ Quem é esse personagem?\nDica: ${c.name?.charAt(0) || "?"}`);
    }
  },
};
