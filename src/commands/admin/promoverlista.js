import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

export default {
  name: "promoverlista",
  description: "Promove vários membros mencionados a administrador.",
  commands: ["promoverlista", "promovervarios"],
  usage: `${PREFIX}promoverlista @membro1 @membro2`,
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
        `Marque os membros que deseja promover.\nExemplo: ${PREFIX}promoverlista @membro1 @membro2`
      );
    }

    const { participants } = await socket.groupMetadata(remoteJid);

    const alvos = [...new Set(mentionedJid)].filter((jid) =>
      participants.some(
        (participant) =>
          participant.id === jid ||
          participant.lid === jid ||
          participant.jid === jid
      )
    );

    if (!alvos.length) {
      throw new InvalidParameterError(
        "Nenhum dos usuários mencionados foi encontrado neste grupo."
      );
    }

    const promovidos = [];
    const jaAdmins = [];
    const falharam = [];

    for (const jid of alvos) {
      const participant = participants.find(
        (p) =>
          p.id === jid ||
          p.lid === jid ||
          p.jid === jid
      );

      if (
        participant?.admin === "admin" ||
        participant?.admin === "superadmin"
      ) {
        jaAdmins.push(jid);
        continue;
      }

      try {
        await socket.groupParticipantsUpdate(
          remoteJid,
          [jid],
          "promote"
        );

        promovidos.push(jid);
      } catch {
        falharam.push(jid);
      }
    }

    const formatar = (lista) =>
      lista
        .map((jid) => `@${jid.split("@")[0].split(":")[0]}`)
        .join(", ");

    let resposta = `✦ ── *PROMOÇÃO ADM* ── ✦\n\n`;

    if (promovidos.length) {
      resposta += `👑 *Promovidos:*\n${formatar(promovidos)}\n\n`;
    }

    if (jaAdmins.length) {
      resposta += `ℹ️ *Já eram administradores:*\n${formatar(jaAdmins)}\n\n`;
    }

    if (falharam.length) {
      resposta += `❌ *Não foi possível promover:*\n${formatar(falharam)}\n\n`;
    }

    resposta += `╰─ ✧ *Total processado:* ${alvos.length}`;

    const mentions = [...new Set([...promovidos, ...jaAdmins, ...falharam])];

    await sendSuccessReply(resposta, mentions);
  },
};
