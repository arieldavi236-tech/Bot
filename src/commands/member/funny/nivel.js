import path from "node:path";
import { ASSETS_DIR } from "../../../config.js";

export default {
  name: "nazista",
  description: "Mostra uma porcentagem aleatória.",
  commands: ["nazista"],

  handle: async ({
    sendImageFromFile,
    userLid,
    replyLid,
    args,
    isReply,
  }) => {
    const targetLid = isReply
      ? replyLid
      : args.length
        ? `${args[0].replace(/\D/g, "")}@lid`
        : userLid;

    const numero = targetLid.split("@")[0];
    const porcentagem = Math.floor(Math.random() * 201);

    const texto = `🇩🇪  𝙌𝙐𝘼𝙉𝙏𝙊 𝙑𝙊𝘾𝙀̂ 𝙀́ 𝙉𝘼𝙕𝙄𝙎𝙏𝘼😈 

👤 Usuário: @${numero}

🇩🇪 Porcentagem: *${porcentagem}%*`;

    const imagePath = path.resolve(
      ASSETS_DIR,
      "images",
      "funny",
      "NA.jpeg"
    );

    await sendImageFromFile(imagePath, texto, [targetLid]);
  },
};
