import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";

export default {
  name: "pau",
  description: "Mostra um resultado aleatório de brincadeira.",
  commands: ["pau"],
  usage: `${PREFIX}pau`,

  handle: async ({
    sendImageFromFile,
    userLid,
    args,
    replyLid,
    isReply,
  }) => {
    const targetLid = isReply
      ? replyLid
      : args.length
        ? `${args[0].replace(/\D/g, "")}@lid`
        : userLid;

    const numero = targetLid.split("@")[0];

    const pontos = Math.floor(Math.random() * 33);
    const sorte = Math.floor((pontos / 32) * 100);

    const blocos = Math.round(sorte / 10);
    const barra =
      "█".repeat(blocos) + "░".repeat(10 - blocos);

    const resultados = [
      "Hoje a sorte bateu forte! 😂",
      "A sorte resolveu aparecer! 😎",
      "Resultado inesperado! 😂",
      "Hoje não foi o seu dia... 👀",
      "A roleta decidiu! 🎲",
    ];

    const resultado =
      resultados[Math.floor(Math.random() * resultados.length)];

    const texto = `📏 𝐌𝐄𝐃𝐈𝐃𝐎𝐑 𝐃𝐎 𝐃𝐈𝐀

👤 Usuário: @${numero}

📐 CM: *${pontos}*
🎲 Sorte: ${barra} ${sorte}%
😂 Resultado: ${resultado}`;

    const imagePath = path.resolve(
      ASSETS_DIR,
      "images",
      "funny",
      "Tamanho.jpg"
    );

    await sendImageFromFile(
      imagePath,
      texto,
      [targetLid]
    );
  },
};
