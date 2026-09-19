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
  name: "antilink",
  description: "Ativa ou desativa o sistema anti-link",
  commands: ["antilink"],
  usage: `${PREFIX}antilink on/off`,
  handle: async ({
    fullArgs,
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const option = String(fullArgs || "").toLowerCase();

    if (!["on", "off", "1", "0"].includes(option)) {
      throw new WarningError(
        `Use:\n${PREFIX}antilink on\nou\n${PREFIX}antilink off`
      );
    }

    const data = await load();

    if (!data[remoteJid]) data[remoteJid] = {};
    data[remoteJid].antilink = option === "on" || option === "1";

    await save(data);

    await sendSuccessReply(
      data[remoteJid].antilink
        ? "🔗 Anti-link ativado neste grupo."
        : "🔗 Anti-link desativado neste grupo."
    );
  },
};
