import { TEMP_DIR } from "../../../config.js";
import { onlyNumbers } from "../../../utils/index.js";
import fs from "node:fs";
import path from "node:path";
import { Jimp } from "jimp";

export default {
  name: "gostosa",
  description: "Quanto voce e gostosa",
  commands: ["gostosa","gata","gostoso"],
  usage: "!gostosa",
  handle: async ({ userLid, replyLid, args, isReply, sendImageFromFile, sendReply }) => {
    const targetLid = isReply? replyLid : args.length? onlyNumbers(args[0]) + "@lid" : userLid;
    const porc = Math.floor(Math.random() * 201);
    let frase = "";
    if (porc < 30) frase = "FEIA PRA CARALHO";
    else if (porc < 70) frase = "DA PRO GASTO";
    else if (porc < 110) frase = "TA GATINHA";
    else if (porc < 160) frase = "GOSTOSA DA PORRA";
    else frase = "GOSTOSONA PROIBIDA";
    const qtd = Math.min(10, Math.floor(porc / 10));
    const barra = "█".repeat(qtd) + "░".repeat(10 - qtd);

    const bgPath = path.resolve("src/assets/gostosa.jpg");
    const img = await Jimp.read(bgPath);
    img.resize({ w: 800, h: 500 });

    const filePath = path.resolve(TEMP_DIR, "gostosa-" + Date.now() + ".jpg");
    await img.write(filePath);

    const texto = "𝐎 𝐐𝐔𝐀𝐍𝐓𝐎 𝐕𝐎𝐂Ê É 𝐆𝐎𝐒𝐓𝐎𝐒𝐀😈\n\n@" + onlyNumbers(targetLid) + "\n\n" + porc + "% - " + frase + " 😩\nNível: " + barra + " " + porc + "%";
    try {
      await sendImageFromFile(filePath, texto, [targetLid]);
    } catch {
      await sendReply(texto, [targetLid]);
    } finally {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
  },
};
