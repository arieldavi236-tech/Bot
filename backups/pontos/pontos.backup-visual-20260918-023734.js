import { PREFIX } from "../../config.js";

export default {
  name: "pontos",
  description: "Consulta seus pontos",
  commands: ["pontos"],
  usage: `${PREFIX}pontos`,

  handle: async ({
    userLid,
    sendReply,
  }) => {
    const fs = await import("fs");
    const path = await import("path");
    const { fileURLToPath } = await import("url");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const databaseFile = path.join(
      __dirname,
      "../../../database/brincadeiras.json"
    );

    let banco = {};

    try {
      banco = JSON.parse(
        fs.readFileSync(databaseFile, "utf8")
      );
    } catch {
      banco = {};
    }

    const dados = banco[userLid] || {
      pontos: 0,
      vitorias: 0,
    };

    await sendReply(
      `╭────〔 ⭐ PONTOS 〕
│
│ 👤 Jogador: @${userLid.replace("@lid", "")}
│ ⭐ Pontos: ${dados.pontos}
│ 🏆 Vitórias: ${dados.vitorias}
│
╰────────────────────`,
      [userLid]
    );
  },
};
