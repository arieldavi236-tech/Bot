import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

export default {
  name: "despromoverlista",
  description: "Rebaixa vários administradores mencionados.",
  commands: ["despromoverlista", "rebaixarlista"],
  usage: `${PREFIX}despromoverlista @admin1 @admin2`,
  handle: async ({
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
        `Marque os administradores.\nExemplo: ${PREFIX}despromoverlista @admin1 @admin2`
      );
    }

    const { participants } = await socket.groupMetadata(remoteJid);

    const alvos = [...new Set(mentionedJid)]
      .map((jid) =>
        participants.find(
          (participant) =>
            participant.id === jid ||
            participant.lid === jid ||
            participant.jid === jid
        )
      )
      .filter(Boolean);

    if (!alvos.length) {
      throw new InvalidParameterError(
        "Nenhum dos usuários mencionados foi encontrado neste grupo."
      );
    }

    const rebaixados = [];
    const naoAdmins = [];
    const falharam = [];

    for (const participant of alvos) {
      const jid =
        participant.id || participant.lid || participant.jid;

      const isAdmin =
        participant.admin === "admin" ||
        participant.admin === "superadmin";

      if (!isAdmin) {
        naoAdmins.push(jid);
        continue;
      }

      if (participant.admin === "superadmin") {
        naoAdmins.push(jid);
        continue;
      }

      try {
        await socket.groupParticipantsUpdate(
          remoteJid,
          [jid],
          "demote"
        );

        rebaixados.push(jid);
      } catch {
        falharam.push(jid);
      }
    }

    const formatar = (lista) =>
      lista
        .map((jid) => `@${jid.split("@")[0].split(":")[0]}`)
        .join(", ");

    let resposta = `✦ ── *REBAIXAMENTO ADM* ── ✦\n\n`;

    if (rebaixados.length) {
      resposta += `👤 *Rebaixados:*\n${formatar(rebaixados)}\n\n`;
    }

    if (naoAdmins.length) {
      resposta += `ℹ️ *Não rebaixados:*\n${formatar(naoAdmins)}\n\n`;
    }

    if (falharam.length) {
      resposta += `❌ *Falharam:*\n${formatar(falharam)}\n\n`;
    }

    resposta += `╰─ ✧ *Total processado:* ${alvos.length}`;

    await sendSuccessReply(
      resposta,
      [...new Set([...rebaixados, ...naoAdmins, ...falharam])]
    );
  },
};
