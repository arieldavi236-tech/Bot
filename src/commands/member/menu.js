import path from "node:path";
import { ASSETS_DIR, PREFIX, OWNER_LID } from "../../config.js";
import { menuMessage } from "../../menu.js";
import { isAdmin } from "../../middlewares/index.js";

export default {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help"],
  usage: "${PREFIX}menu [categoria]",

  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    remoteJid,
    args,
    userLid,
    socket,
    sendSuccessReact,
    sendImageFromFile,
    sendReply,
  }) => {
    const category = args?.[0]?.toLowerCase().trim() || "";

    if (["adm", "admin", "admins"].includes(category)) {
      const admin = await isAdmin({
        remoteJid,
        userLid,
        socket,
      });

      if (!admin) {
        await sendReply("Calma aí, membro comum kkk");
        return;
      }
    }

    await sendSuccessReact();

    await sendImageFromFile(
      path.join(ASSETS_DIR, "images", "takeshi-bot.png"),
      `${menuMessage(remoteJid, category)}`,
      [OWNER_LID],
    );
  },
};
