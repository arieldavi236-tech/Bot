import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "quizanime",
  description: "Inicia um quiz de anime.",
  commands: ["quizanime"],
  usage: "!quizanime",
  handle: async ({ sendReply }) => {
    const list = await getAnimeResults("Naruto", 10);
    const a = list[Math.floor(Math.random() * list.length)];

    await sendReply([
      "╭━━━「 🎮 QUIZ ANIME 」━━━╮",
      "┃ ✦ Qual é o nome deste anime?",
      `┃ ✦ Dica: começa com ${a.title.charAt(0).toUpperCase()}`,
      "┃",
      "┃ Responda com o nome do anime!",
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n"));
  },
};
