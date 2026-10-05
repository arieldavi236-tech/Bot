/**
 * Evento chamado quando um usuário
 * entra ou sai de um grupo de WhatsApp.
 *
 * @author Dev Gui
 */
import fs from "fs";
import { exitMessage, welcomeMessage } from "../messages.js";
import {
  isActiveExitGroup,
  isActiveGroup,
  isActiveWelcomeGroup,
  isBlacklistMember,
} from "../utils/database.js";
import { extractUserLid, onlyNumbers } from "../utils/index.js";
import { errorLog } from "../utils/logger.js";

const ADMIN_SETTINGS_PATH = "./assets/admin-settings.json";

function getAdminSettings(remoteJid) {
  try {
    if (!fs.existsSync(ADMIN_SETTINGS_PATH)) {
      return {};
    }

    const data = JSON.parse(
      fs.readFileSync(ADMIN_SETTINGS_PATH, "utf8"),
    );

    return data?.[remoteJid] || {};
  } catch (error) {
    errorLog(`Erro ao ler admin-settings.json: ${error.message}`);
    return {};
  }
}

export async function onGroupParticipantsUpdate({
  data,
  remoteJid,
  socket,
  action,
}) {
  try {
    if (!remoteJid.endsWith("@g.us")) {
      return;
    }

    if (!isActiveGroup(remoteJid)) {
      return;
    }

    const userLid = extractUserLid(data);

    // 🚫 LISTA NEGRA
    if (
      action === "add" &&
      userLid &&
      isBlacklistMember(remoteJid, userLid)
    ) {
      await socket.groupParticipantsUpdate(
        remoteJid,
        [userLid],
        "remove",
      );

      await socket.sendMessage(remoteJid, {
        text: "🚫 Um membro da Lista Negra tentou entrar e foi removido automaticamente.",
      });

      return;
    }

    if (isActiveWelcomeGroup(remoteJid) && action === "add") {
      const hasMemberMention = welcomeMessage.includes("@member");

      const mentions = [];
      let finalWelcomeMessage = welcomeMessage;

      if (hasMemberMention && userLid) {
        const userNumber = onlyNumbers(userLid);

        finalWelcomeMessage = welcomeMessage.replace(
          "@member",
          `@${userNumber}`,
        );

        mentions.push(userLid);
      }

      const groupSettings = getAdminSettings(remoteJid);
      const welcomeImage = groupSettings?.welcomeImage;
      console.log("♛ WELCOME IMG DEBUG:", { remoteJid, welcomeImage, exists: !!welcomeImage && fs.existsSync(welcomeImage) });

      // 🖼️ Se houver imagem configurada, envia imagem + mensagem
      if (welcomeImage && fs.existsSync(welcomeImage)) {
        await socket.sendMessage(remoteJid, {
          image: fs.readFileSync(welcomeImage),
          caption: finalWelcomeMessage,
          mentions,
        });
      } else {
        // 💬 Sem imagem, mantém o comportamento antigo
        await socket.sendMessage(remoteJid, {
          text: finalWelcomeMessage,
          mentions,
        });
      }
    } else if (isActiveExitGroup(remoteJid) && action === "remove") {
      const hasMemberMention = exitMessage.includes("@member");

      const mentions = [];
      let finalExitMessage = exitMessage;

      if (hasMemberMention && userLid) {
        const userNumber = onlyNumbers(userLid);

        finalExitMessage = exitMessage.replace(
          "@member",
          `@${userNumber}`,
        );

        mentions.push(userLid);
      }

      await socket.sendMessage(remoteJid, {
        text: finalExitMessage,
        mentions,
      });
    }
  } catch (error) {
    errorLog(`Erro em onGroupParticipantsUpdate: ${error.message}`);
    errorLog(JSON.stringify(error, null, 2));
  }
}
