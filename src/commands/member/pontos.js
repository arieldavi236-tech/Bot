import fs from "fs";
import path from "path";
export default {

  name: "pontos",
  description: "Consulta seus pontos",
  commands: ["pontos"],
  usage: "!pontos",

  handle: async ({ userLid, sendReply }) => {
    let banco = {};

    try {
      banco = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), "database/brincadeiras.json"),
          "utf8"
        )
      );
    } catch {
      banco = {};
    }

    const dados = banco[userLid] || {
      pontos: 0,
      vitorias: 0,
    };

    await sendReply(
      `✦ ── 𝐌𝐄𝐔𝐒 𝐏𝐎𝐍𝐓𝐎𝐒

👤 @${userLid.replace("@lid", "")}

⭐ Pontos: ${dados.pontos}
🏆 Vitórias: ${dados.vitorias}

╰─ ✧ 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛`,
      [userLid]
    );
  },
};
