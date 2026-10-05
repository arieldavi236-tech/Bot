import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import { isBotOwner } from "../../middlewares/index.js";
import { setPrivateEnabled } from "../../utils/pvControl.js";

export default {
  name: "pvoff",
  description: "Desativa as respostas do bot no privado.",
  commands: ["pvoff"],
  usage: `${PREFIX}pvoff`,

  handle: async ({ userLid, sendSuccessReply, isGroup }) => {
    if (!isBotOwner({ userLid })) {
      throw new WarningError("Apenas o dono do bot pode usar este comando!");
    }

    if (isGroup) {
      throw new WarningError("Use este comando no privado do bot.");
    }

    setPrivateEnabled(false);

    await sendSuccessReply("PV desativado! Vou continuar funcionando normalmente nos grupos.");
  },
};
