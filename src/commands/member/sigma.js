import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../config.js";
import { onlyNumbers } from "../../utils/index.js";

export default {
  name: "sigma",
  description: "Medidor de Sigma / Alpha",
  commands: ["sigma", "alpha", "beta"],
  usage: `${PREFIX}sigma`,

  handle: async ({
    sendGifFromFile,
    sendImageFromFile,
    userLid,
    replyLid,
    args,
    isReply,
    fullMessage,
    sendReply,
  }) => {
    const cmd =
      (fullMessage || "")
        .slice(1)
        .split(/\s+/)[0]
        .toLowerCase() || "sigma";

    const porcentagem = Math.floor(Math.random() * 101);

    let titulo = "";
    let frase = "";
    let emoji = "";
    let arquivo = "";
    let tipoArquivo = "";

    if (cmd === "sigma") {
      titulo = "𝐒𝐈𝐆𝐌𝐀";
      arquivo = "Sigma.mp4";
      tipoArquivo = "gif";

      if (porcentagem < 20) {
        frase = "BETA FRACO, SEM MORAL";
        emoji = "😢";
      } else if (porcentagem < 40) {
        frase = "QUASE LARGANDO O BETA";
        emoji = "🤔";
      } else if (porcentagem < 60) {
        frase = "EM EVOLUÇÃO, TA NO CAMINHO";
        emoji = "😎";
      } else if (porcentagem < 85) {
        frase = "SIGMA DE VERDADE, RESPEITA";
        emoji = "🔥";
      } else {
        frase = "ALPHA SUPREMO, LENDÁRIO";
        emoji = "👑";
      }
    }

    if (cmd === "alpha") {
      titulo = "𝐀𝐋𝐏𝐇𝐀";
      arquivo = "alpha.jpg";
      tipoArquivo = "imagem";

      if (porcentagem < 50) {
        frase = "BETA DEMAIS, SÓ SOFRE";
        emoji = "😭";
      } else {
        frase = "ALPHA DOMINANTE";
        emoji = "🦁";
      }
    }

    if (cmd === "beta") {
      titulo = "𝐁𝐄𝐓𝐀";
      arquivo = "beta.jpg";
      tipoArquivo = "imagem";

      if (porcentagem < 50) {
        frase = "BETA DEMAIS, SÓ SOFRE";
        emoji = "😭";
      } else {
        frase = "ALPHA DOMINANTE";
        emoji = "🦁";
      }
    }

    const targetLid = isReply
      ? replyLid
      : args.length
        ? `${onlyNumbers(args[0])}@lid`
        : userLid;

    const numero = onlyNumbers(targetLid);

    const qtd = Math.min(10, Math.floor(porcentagem / 10));
    const barra =
      "█".repeat(qtd) + "░".repeat(10 - qtd);

    const texto =
      `╭━━━「 ${titulo} ${emoji} 」━━━╮\n` +
      `┃\n` +
      `┃ 👤 @${numero}\n` +
      `┃\n` +
      `┃ ⚡ ${titulo}: ${porcentagem}%\n` +
      `┃ ${emoji} ${frase}\n` +
      `┃\n` +
      `┃ 𝐍𝐈́𝐕𝐄𝐋\n` +
      `┃ ${barra} ${porcentagem}%\n` +
      `┃\n` +
      `╰━━━━━━━━━━━━━━━━━━╯`;

    const caminho = path.resolve(
      ASSETS_DIR,
      "images",
      "funny",
      arquivo
    );

    try {
      if (tipoArquivo === "gif") {
        await sendGifFromFile(
          caminho,
          texto,
          [targetLid]
        );
      } else {
        await sendImageFromFile(
          caminho,
          texto,
          [targetLid]
        );
      }
    } catch {
      await sendReply(texto, [targetLid]);
    }
  },
};
