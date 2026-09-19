import { PREFIX } from "../../config.js";
import {
  removeBlacklistMember,
} from "../../utils/database.js";
import { onlyNumbers } from "../../utils/index.js";
import { InvalidParameterError } from "../../errors/index.js";

export default {
  name: "tirarlistanegra",
  description: "Remove um membro da lista negra.",
  commands: [
    "tirarlistanegra",
    "tirar-lista-negra",
    "unblacklist"
  ],
  usage: `${PREFIX}tirarlistanegra @membro`,
  handle: async ({
    args,
    isReply,
    replyLid,
    remoteJid,
    sendReply,
    sendSuccessReact,
  }) => {
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

    const removed = removeBlacklistMember(
      remoteJid,
      targetLid
    );

    if (!removed) {
      throw new InvalidParameterError(
        "Este membro não está na lista negra."
      );
    }

    await sendSuccessReact();

    await sendReply(
      `✅ *@${targetLid.split("@")[0]}* foi removido da Lista Negra.`,
      [targetLid]
    );
  },
};
