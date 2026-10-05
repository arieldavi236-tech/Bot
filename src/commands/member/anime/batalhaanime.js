import { getCharacterResults } from "../../../utils/anime/api.js";

export default {
  name: "batalhaanime",
  description: "Sorteia dois personagens para uma batalha.",
  commands: ["batalhaanime"],
  usage: "!batalhaanime",
  handle: async ({ sendReply }) => {
    const list = await getCharacterResults("a", 20);
    if (list.length < 2) return sendReply("Não consegui montar a batalha agora.");

    const a = list[Math.floor(Math.random() * list.length)];
    let b = list[Math.floor(Math.random() * list.length)];

    while (b.mal_id === a.mal_id && list.length > 1) {
      b = list[Math.floor(Math.random() * list.length)];
    }

    await sendReply([
      "╭━━━「 ⚔️ アニメ BATTLE 」━━━╮",
      `┃ ✦ 𝑳𝒖𝒕𝒂𝒅𝒐𝒓 𝑨: ${a.name}`,
      `┃ ✦ 𝑳𝒖𝒕𝒂𝒅𝒐𝒓 𝑩: ${b.name}`,
      "┃",
      "┃ Quem venceria?",
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n"));
  },
};
