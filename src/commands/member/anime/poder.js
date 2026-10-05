import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";

const poderes = [
  "🔥 Manipulação de fogo",
  "❄️ Controle de gelo",
  "⚡ Velocidade elétrica",
  "🌪️ Manipulação do vento",
  "🌊 Controle da água",
  "🌑 Manipulação das sombras",
  "✨ Energia espiritual",
  "💥 Força sobre-humana",
  "🌀 Teletransporte",
  "🔮 Poder psíquico",
  "🌳 Controle da natureza",
  "☀️ Energia solar",
  "🌙 Poder lunar",
  "👁️ Visão sobrenatural",
  "🩸 Regeneração",
  "🐉 Poder de dragão",
  "🛡️ Barreira espiritual",
  "💫 Manipulação de energia",
  "🎭 Transformação",
  "⏳ Manipulação do tempo",
];

export default {
  name: "poder",
  description: "Recebe um poder aleatório de anime.",
  commands: ["poder"],
  usage: `${PREFIX ?? "!"}poder`,
  handle: async ({ sendReply }) => {
    const poder = poderes[Math.floor(Math.random() * poderes.length)];

    await sendReply(
      `╭━━━「 🎌 PODER ANIME 」━━━╮\n` +
      `┃\n` +
      `┃  ✦ Seu poder é:\n` +
      `┃  ❖ ${poder}\n` +
      `┃\n` +
      `╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯`
    );
  },
};
