import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import { criarAluguel } from "../../utils/aluguel.js";

export default {
  name: "alugar",
  description: "Ativa um aluguel para o grupo por determinada quantidade de dias",
  commands: ["alugar"],
  usage: `${PREFIX}alugar 29`,

  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ args, remoteJid, isGroup, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError(
        "Este comando deve ser usado dentro de um grupo."
      );
    }

    const dias = Number(args[0]);

    if (!Number.isInteger(dias) || dias <= 0) {
      throw new WarningError(
        `Informe a quantidade de dias.\n\nExemplo: ${PREFIX}alugar 29`
      );
    }

    const aluguel = criarAluguel(remoteJid, dias);

    const vencimento = new Date(aluguel.vencimentoEm);

    const data = vencimento.toLocaleDateString("pt-BR");
    const hora = vencimento.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    await sendSuccessReply(
      `╭────〔 💰 ALUGUEL 〕
│
│ ♛ Shizuka Bot
│
│ 🟢 Status: ATIVO
│ 📅 Dias contratados: ${dias}
│ 📆 Vencimento: ${data}
│ ⏰ Horário: ${hora}
│
│ ✅ Aluguel registrado!
╰────────────────────`
    );
  },
};
