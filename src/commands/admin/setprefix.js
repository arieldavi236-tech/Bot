import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

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
  name: "setprefix",
  description: "Define o prefixo personalizado do grupo",
  commands: ["setprefix", "set-prefix"],
  usage: `${PREFIX}setprefix !`,
  handle: async ({
    fullArgs,
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    const prefix = String(fullArgs || "").trim();

    if (!prefix || prefix.length > 3 || /\s/.test(prefix)) {
      throw new InvalidParameterError(
        "O prefixo deve ter de 1 a 3 caracteres e não pode conter espaços."
      );
    }

    const data = await load();
    if (!data[remoteJid]) data[remoteJid] = {};

    data[remoteJid].prefix = prefix;
    await save(data);

    await sendSuccessReply(
      `✅ Prefixo deste grupo salvo como: *${prefix}*\n\n` +
      `⚠️ O sistema que interpreta as mensagens precisa consultar essa configuração para o prefixo personalizado funcionar.`
    );
  },
};
