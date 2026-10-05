import { onlyNumbers } from "../../utils/index.js";
import path from "node:path";

export default {
  name: "gay",
  description: "Brincadeiras gay / feio / corno",
  commands: ["gay", "feio", "corno"],
  usage: "!gay",

  handle: async ({
    userLid,
    replyLid,
    args,
    isReply,
    fullMessage,
    sendImageFromFile,
    sendReply,
  }) => {
    const cmd = (fullMessage || "")
      .slice(1)
      .split(/\s+/)[0]
      .toLowerCase() || "gay";

    const tipo = ["gay", "feio", "corno"].includes(cmd) ? cmd : "gay";

    const targetLid = isReply
      ? replyLid
      : args.length
        ? onlyNumbers(args[0]) + "@lid"
        : userLid;

    const porc = Math.floor(Math.random() * 201);

    let titulo = "";
    let frase = "";
    let imagem = "";

    if (tipo === "gay") {
      titulo = "𝐎 𝐐𝐔𝐀𝐍𝐓𝐎 𝐕𝐎𝐂Ê É 𝐆𝐀𝐘 🏳️‍🌈";
      imagem = "gay.jpg";

      if (porc < 30) frase = "HÉTERO DEMAIS";
      else if (porc < 70) frase = "DISFARÇADO";
      else if (porc < 110) frase = "VIADINHO ASSUMIDO";
      else if (porc < 160) frase = "GAY PRA CARALHO";
      else frase = "GAY PROFISSIONAL 🏳️‍🌈";
    }

    if (tipo === "feio") {
      titulo = "𝐎 𝐐𝐔𝐀𝐍𝐓𝐎 𝐕𝐎𝐂Ê É 𝐅𝐄𝐈𝐎";
      imagem = "feio.jpg";

      if (porc < 30) frase = "BONITINHO ATÉ";
      else if (porc < 70) frase = "MAIS OU MENOS";
      else if (porc < 110) frase = "FEIO PRA KRL";
      else if (porc < 160) frase = "FEIO DEMAIS";
      else frase = "HORROROSO QUE DÓI 😭";
    }

    if (tipo === "corno") {
      titulo = "𝐎 𝐐𝐔𝐀𝐍𝐓𝐎 𝐕𝐎𝐂Ê É 𝐂𝐎𝐑𝐍𝐎";
      imagem = "corno.jpg";

      if (porc < 30) frase = "0 CHIFRE, TÁ SAFE";
      else if (porc < 70) frase = "CORNO MANSO";
      else if (porc < 110) frase = "CORNO BRAVO";
      else if (porc < 160) frase = "CHIFRUDO DEMAIS";
      else frase = "REI DOS CHIFRES 🤘";
    }

    const qtd = Math.min(10, Math.floor(porc / 10));
    const barra = "█".repeat(qtd) + "░".repeat(10 - qtd);

    const texto =
      titulo +
      "\n\n@" +
      onlyNumbers(targetLid) +
      "\n\n" +
      porc +
      "% - " +
      frase +
      "\n" +
      "Nível: " +
      barra +
      " " +
      porc +
      "%";

    const imagemPath = path.resolve("src/assets", imagem);

    try {
      await sendImageFromFile(imagemPath, texto, [targetLid]);
    } catch {
      await sendReply(texto, [targetLid]);
    }
  },
};
