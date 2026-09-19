/**
 * Evento chamado quando um usuário
 * entra ou sai de um grupo de WhatsApp.
 *
 * @author Dev Gui
 */
import { exitMessage, welcomeMessage } from "../messages.js";
import {
  isActiveExitGroup,
  isActiveGroup,
  isActiveWelcomeGroup,
  isBlacklistMember,
} from "../utils/database.js";
import { extractUserLid, onlyNumbers } from "../utils/index.js";
import { errorLog } from "../utils/logger.js";

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
    // Se um membro da lista negra entrar novamente,
    // o bot remove automaticamente.
    if (
      action === "add" &&
      userLid &&
      isBlacklistMember(remoteJid, userLid)
    ) {
      await socket.groupParticipantsUpdate(
        remoteJid,
        [userLid],
        "remove"
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

      if (hasMemberMention) {
        const userNumber = onlyNumbers(userLid);
        finalWelcomeMessage = welcomeMessage.replace(
          "@member",
          `@${userNumber}`,
        );
        mentions.push(userLid);
      }

      await socket.sendMessage(remoteJid, {
        text: finalWelcomeMessage,
        mentions,
      });
    } else if (isActiveExitGroup(remoteJid) && action === "remove") {
      const hasMemberMention = exitMessage.includes("@member");

      const mentions = [];
      let finalExitMessage = exitMessage;

      if (hasMemberMention) {
        const userNumber = onlyNumbers(userLid);
        finalExitMessage = exitMessage.replace("@member", `@${userNumber}`);
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
