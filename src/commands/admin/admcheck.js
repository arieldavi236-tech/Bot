import { PREFIX } from "../../config.js";
import { WarningError } from "../../errors/index.js";
import { onlyNumbers } from "../../utils/index.js";

export default {
  name: "admcheck",
  description: "Verifica se um usuário é administrador do grupo.",
  commands: ["admcheck", "veradm", "ehadmin"],
  usage: `${PREFIX}admcheck @usuario`,
  handle: async ({
    args,
    remoteJid,
    socket,
    isGroup,
    sendReply,
    sendReact,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!args.length || !args[0]) {
      throw new WarningError(
        `Marque um usuário. Exemplo: ${PREFIX}admcheck @usuario`
      );
    }

    const number = onlyNumbers(args[0]);

    if (!number) {
      throw new WarningError("Usuário inválido.");
    }

    const userLid = `${number}@lid`;
    const userJid = `${number}@s.whatsapp.net`;

    const { participants } = await socket.groupMetadata(remoteJid);

    const participant = participants.find(
      (p) =>
        p.id === userLid ||
        p.id === userJid ||
        p.lid === userLid ||
        p.jid === userJid
    );

    if (!participant) {
      return sendReply(
        `❌ @${number} não foi encontrado neste grupo.`,
        [userLid]
      );
    }

    const isAdmin =
      participant.admin === "admin" ||
      participant.admin === "superadmin";

    await sendReact(isAdmin ? "👑" : "👤");

    await sendReply(
      `✦ ── *VERIFICAÇÃO ADM* ── ✦\n\n` +
        `👤 Usuário: @${number}\n` +
        `📌 Status: ${isAdmin ? "👑 Administrador" : "👤 Membro comum"}`
    , [userLid]);
  },
};
