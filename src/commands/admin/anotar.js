import fs from "node:fs/promises";
import path from "node:path";
import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

const FILE = path.resolve("assets/admin-anotacoes.json");

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
  name: "anotar",
  description: "Salva uma anotação do grupo",
  commands: ["anotar", "nota"],
  usage: `${PREFIX}anotar texto`,
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
        `Digite uma anotação.\nExemplo: ${PREFIX}anotar Reunião sábado às 19h`
      );
    }

    const data = await load();
    if (!data[remoteJid]) data[remoteJid] = [];

    data[remoteJid].push({
      texto: fullArgs,
      data: new Date().toISOString(),
    });

    await save(data);

    await sendSuccessReply("📝 Anotação salva com sucesso!");
  },
};
