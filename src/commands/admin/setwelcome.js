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
  name: "setwelcome",
  description: "Define a mensagem de boas-vindas do grupo",
  commands: ["setwelcome", "set-welcome"],
  usage: `${PREFIX}setwelcome mensagem`,
  handle: async ({
    fullArgs,
    remoteJid,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!fullArgs) {
      throw new InvalidParameterError(
        `Informe a mensagem.\nExemplo: ${PREFIX}setwelcome Seja bem-vindo(a)!`
      );
    }

    const data = await load();
    if (!data[remoteJid]) data[remoteJid] = {};

    data[remoteJid].welcome = fullArgs;
    await save(data);

    await sendSuccessReply(
      "👋 Mensagem de boas-vindas salva com sucesso!"
    );
  },
};
