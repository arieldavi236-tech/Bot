import { getCharacterResults } from "../../../utils/anime/api.js";

export default {
  name: "duelo",
  description: "Cria um duelo aleatório entre personagens.",
  commands: ["duelo"],
  usage: "!duelo",
  handle: async ({ sendReply }) => {
    const list = await getCharacterResults("a", 20);
    if (list.length < 2) return sendReply("Não consegui criar o duelo.");

    const a = list[Math.floor(Math.random() * list.length)];
    let b = list[Math.floor(Math.random() * list.length)];

    while (b.mal_id === a.mal_id) {
      b = list[Math.floor(Math.random() * list.length)];
    }

    const poderA = Math.floor(Math.random() * 101);
    const poderB = Math.floor(Math.random() * 101);

    await sendReply([
      "╭━━━「 ⚡ DUEL • 決闘 」━━━╮",
      `┃ ✦ ${a.name}: ${poderA}%`,
      `┃ ✦ ${b.name}: ${poderB}%`,
      "┃",
      `┃ ✦ Resultado aleatório: ${poderA >= poderB ? a.name : b.name}`,
      "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯",
    ].join("\n"));
  },
};
