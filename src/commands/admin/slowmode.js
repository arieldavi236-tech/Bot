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
  name: "slowmode",
  description: "Configura o intervalo do modo lento",
  commands: ["slowmode", "modo-lento"],
  usage: `${PREFIX}slowmode segundos`,
  handle: async ({
    fullArgs,
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const seconds = Number(fullArgs);

    if (!Number.isInteger(seconds) || seconds < 0 || seconds > 3600) {
      throw new WarningError(
        `Use um valor entre 0 e 3600 segundos.\nExemplo: ${PREFIX}slowmode 10`
      );
    }

    const data = await load();
    if (!data[remoteJid]) data[remoteJid] = {};

    data[remoteJid].slowmode = seconds;
    await save(data);

    await sendSuccessReply(
      seconds === 0
        ? "🐢 Slowmode desativado."
        : `🐢 Slowmode configurado para ${seconds} segundo(s).`
    );
  },
};
