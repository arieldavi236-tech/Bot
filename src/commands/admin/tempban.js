import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

export default {
  name: "tempban",
  description: "Remove um membro temporariamente",
  commands: ["tempban", "ban-temporario"],
  usage: `${PREFIX}tempban @membro minutos`,
  handle: async ({
    fullArgs,
    remoteJid,
    socket,
    isGroup,
    mentionedJid,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!mentionedJid?.length) {
      throw new InvalidParameterError(
        `Marque o membro.\nExemplo: ${PREFIX}tempban @membro 10`
      );
    }

    const parts = String(fullArgs || "").trim().split(/\s+/);
    const minutes = Number(parts[parts.length - 1]);

    if (!Number.isInteger(minutes) || minutes < 1 || minutes > 1440) {
      throw new InvalidParameterError(
        "Informe o tempo em minutos, entre 1 e 1440."
      );
    }

    const target = mentionedJid[0];

    await socket.groupParticipantsUpdate(
      remoteJid,
      [target],
      "remove"
    );

    await sendSuccessReply(
      `🚫 Membro removido.\n⏱️ Tempo configurado: ${minutes} minuto(s).\n\n` +
      `⚠️ A entrada automática novamente pode depender das configurações de privacidade do WhatsApp.`
    );
  },
};
