import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";

export default {
  name: "regras",
  description: "Mostra as regras do grupo",
  commands: ["regras", "rules"],
  usage: `${PREFIX}regras`,
  handle: async ({ isGroup, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    await sendSuccessReply(
      `📜 *REGRAS DO GRUPO*\n\n` +
      `1. Respeite todos os membros.\n` +
      `2. Não envie spam ou flood.\n` +
      `3. Não envie links sem autorização.\n` +
      `4. Evite conteúdo que prejudique o grupo.\n` +
      `5. Respeite as decisões dos administradores.\n\n` +
      `⚠️ O descumprimento das regras pode gerar advertência ou remoção.`
    );
  },
};
