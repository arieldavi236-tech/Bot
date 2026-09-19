import { BOT_LID, OWNER_LID, PREFIX } from "../../config.js";
import {
  addBlacklistMember,
  isBlacklistMember,
} from "../../utils/database.js";
import { onlyNumbers } from "../../utils/index.js";
import {
  DangerError,
  InvalidParameterError,
} from "../../errors/index.js";
import { errorLog } from "../../utils/logger.js";

export default {
  name: "listanegra",
  description: "Adiciona um membro à lista negra e remove do grupo.",
  commands: ["listanegra", "lista-negra", "blacklist"],
  usage: `${PREFIX}listanegra @membro`,
  handle: async ({
    args,
    isReply,
    replyLid,
    remoteJid,
    userLid,
    socket,
    sendReply,
    sendSuccessReact,
    sendErrorReply,
  }) => {
    try {
      if (!args.length && !isReply) {
        throw new InvalidParameterError(
          "Mencione um membro ou responda a uma mensagem."
        );
      }

      if (args.length && !args[0].includes("@")) {
        throw new InvalidParameterError(
          'Use "@" ao mencionar um membro.'
        );
      }

      const targetLid = isReply
        ? replyLid
        : `${onlyNumbers(args[0])}@lid`;

      if (!targetLid) {
        throw new InvalidParameterError("Membro inválido.");
      }

      if (targetLid === userLid) {
        throw new DangerError(
          "Você não pode adicionar você mesmo à lista negra."
        );
      }

      if (targetLid === BOT_LID || targetLid === OWNER_LID) {
        throw new DangerError(
          "Não é possível adicionar este usuário à lista negra."
        );
      }

      const added = addBlacklistMember(
        remoteJid,
        targetLid
      );

      if (!added && isBlacklistMember(remoteJid, targetLid)) {
        throw new DangerError(
          "Este membro já está na lista negra."
        );
      }

      await socket.groupParticipantsUpdate(
        remoteJid,
        [targetLid],
        "remove"
      );

      await sendSuccessReact();

      await sendReply(
        `🚫 *@${targetLid.split("@")[0]}* foi adicionado à Lista Negra e removido do grupo.`,
        [targetLid]
      );
    } catch (error) {
      errorLog(JSON.stringify(error, null, 2));
      await sendErrorReply(`Erro: ${error.message}`);
    }
  },
};
