import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

const FILES = [
  "assets/admin-settings.json",
  "assets/admin-regras.json",
  "assets/admin-anotacoes.json",
];

export default {
  name: "resetgrupo",
  description: "Remove as configurações personalizadas do grupo",
  commands: ["resetgrupo", "reset-grupo"],
  usage: `${PREFIX}resetgrupo`,
  handle: async ({
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    for (const file of FILES) {
      try {
        const data = JSON.parse(await fs.readFile(file, "utf8"));
        delete data[remoteJid];
        await fs.writeFile(file, JSON.stringify(data, null, 2));
      } catch {}
    }

    await sendSuccessReply(
      "♻️ As configurações personalizadas deste grupo foram restauradas."
    );
  },
};
