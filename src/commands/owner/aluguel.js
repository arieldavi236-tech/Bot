import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import {
  obterAluguel,
  obterDiasRestantes,
  aluguelExpirou,
} from "../../utils/aluguel.js";

export default {
  name: "aluguel",
  description: "Consulta o aluguel atual do grupo",
  commands: ["aluguel"],
  usage: `${PREFIX}aluguel`,

  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({ remoteJid, isGroup, sendSuccessReply }) => {
    if (!isGroup) {
      throw new WarningError(
        "Este comando deve ser usado dentro de um grupo."
      );
    }

    const aluguel = obterAluguel(remoteJid);

    if (!aluguel) {
      throw new WarningError(
        `Este grupo não possui um aluguel registrado.\n\nUse ${PREFIX}alugar 30`
      );
    }

    const expirado = aluguelExpirou(remoteJid);
    const diasRestantes = obterDiasRestantes(remoteJid);

    const vencimento = new Date(aluguel.vencimentoEm);

    const data = vencimento.toLocaleDateString("pt-BR");
    const hora = vencimento.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (expirado) {
      await sendSuccessReply(
        `╭────〔 💰 ALUGUEL 〕
│
│ ♛ Shizuka Bot
│
│ 🔴 Status: EXPIRADO
│ 📅 Dias contratados: ${aluguel.diasContratados}
│ 📆 Vencimento: ${data}
│ ⏰ Horário: ${hora}
│
│ ⚠️ O período do aluguel terminou.
╰────────────────────`
      );

      return;
    }

    await sendSuccessReply(
      `╭────〔 💰 ALUGUEL 〕
│
│ ♛ Shizuka Bot
│
│ 🟢 Status: ATIVO
│ 📅 Dias contratados: ${aluguel.diasContratados}
│ ⏳ Dias restantes: ${diasRestantes}
│ 📆 Vencimento: ${data}
│ ⏰ Horário: ${hora}
│
│ ✅ Aluguel ativo!
╰────────────────────`
    );
  },
};
