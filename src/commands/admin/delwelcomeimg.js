import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

const FILE = path.resolve("assets/admin-settings.json");

async function load() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch {
    return {};
  }
}

async function save(data) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(data, null, 2));
}

export default {
  name: "delwelcomeimg",
  description: "Remove a imagem personalizada da boas-vindas.",
  commands: ["delwelcomeimg", "del-welcome-img"],
  usage: `${PREFIX}delwelcomeimg`,

  handle: async ({
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const data = await load();
    const group = data[remoteJid];

    if (!group?.welcomeImage) {
      throw new WarningError("Este grupo não possui imagem personalizada.");
    }

    try {
      await fs.unlink(group.welcomeImage);
    } catch {}

    delete group.welcomeImage;

    await save(data);

    await sendSuccessReply(
      "🗑️ Imagem de boas-vindas removida deste grupo."
    );
  },
};
