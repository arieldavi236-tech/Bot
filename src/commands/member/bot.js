import { PREFIX } from "../../config.js";

export default {
  name: "bot",

  description: "Mostra o status do bot.",

  commands: ["bot"],

  usage: `${PREFIX}bot`,

  handle: async ({ sendReply }) => {
    await sendReply(`✦ ── 𝐁𝐎𝐓 𝐎𝐍𝐋𝐈𝐍𝐄

╭─「 ⚡ 𝐒𝐭𝐚𝐭𝐮𝐬 」
│
│ 🟢 Online e funcionando
│ ⚙️ Sistema operacional
│ ♛ Pronto para receber comandos
│
╰─ ✧ 𝐒𝐢𝐬𝐭𝐞𝐦𝐚 𝐞𝐬𝐭𝐚́𝐯𝐞𝐥`);
  },
};
