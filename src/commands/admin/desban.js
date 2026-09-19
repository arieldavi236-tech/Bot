import { PREFIX } from "../../config.js";
import { isGroup, onlyNumbers } from "../../utils/index.js";
import { errorLog } from "../../utils/logger.js";

export default {
  name: "desban",
  description: "Readiciona um usuário ao grupo",
  commands: ["desban", "unban", "desbloquear"],
  usage: `${PREFIX}desban 5511999999999`,
  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    args,
    remoteJid,
    socket,
    sendWarningReply,
    sendSuccessReply,
    sendErrorReply,
  }) => {
    if (!isGroup(remoteJid)) {
      return sendWarningReply("Este comando só pode ser usado em grupo!");
    }

    if (!args.length || !args[0]) {
      return sendWarningReply(
        `Use assim: ${PREFIX}desban 5511999999999`
      );
    }

    const number = onlyNumbers(args[0]);

    if (!number || number.length < 10) {
      return sendWarningReply(
        "Informe um número válido com DDD e código do país."
      );
    }

    const userJid = `${number}@s.whatsapp.net`;

    try {
      await socket.groupParticipantsUpdate(
        remoteJid,
        [userJid],
        "add"
      );

      await sendSuccessReply("Usuário readicionado ao grupo com sucesso!");
    } catch (error) {
      errorLog(`Erro ao desbanir usuário: ${error.message}`);

      await sendErrorReply(
        "Não consegui readicionar esse usuário. Verifique se o número está correto e se eu sou administrador do grupo."
      );
    }
  },
};
