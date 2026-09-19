import path from "node:path";
import { ASSETS_DIR, PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { onlyNumbers } from "../../../utils/index.js";

export default {
  name: "comer",
  description: "Você acabou de comer um usuário.",
  commands: ["comer"],
  usage: `${PREFIX}comeu @usuario`,

  handle: async ({
    sendGifFromFile,
    userLid,
    replyLid,
    args,
    isReply,
  }) => {
    if (!args.length && !isReply) {
      throw new InvalidParameterError(
        "Você precisa mencionar ou marcar um membro!"
      );
    }

    const targetLid = isReply
      ? replyLid
      : `${onlyNumbers(args[0])}@lid`;

    const userNumber = onlyNumbers(userLid);
    const targetNumber = onlyNumbers(targetLid);

    await sendGifFromFile(
      path.resolve(ASSETS_DIR, "images", "funny", "Comer.mp4"),
      `😈💦 @${userNumber} acabou de comer @${targetNumber}`,
      [userLid, targetLid]
    );
  },
};
