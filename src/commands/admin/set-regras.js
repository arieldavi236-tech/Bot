import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

const FILE = path.resolve("assets/admin-regras.json");

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
  name: "set-regras",
  description: "Define as regras personalizadas do grupo",
  commands: ["set-regras", "definir-regras"],
  usage: `${PREFIX}set-regras texto das regras`,
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
        `Informe as regras.\nExemplo: ${PREFIX}set-regras Respeite todos e não faça spam.`
      );
    }

    const data = await load();
    data[remoteJid] = fullArgs;
    await save(data);

    await sendSuccessReply("✅ Regras do grupo atualizadas com sucesso!");
  },
};
