import { PREFIX } from "../../config.js";
import { getMemberActivity } from "../../utils/database.js";

export default {
  name: "checkati",
  description: "Consulta a atividade de um membro respondendo à mensagem dele.",
  commands: ["checkati", "checkatividade"],
  usage: `${PREFIX}checkati (respondendo a mensagem do membro)`,

  handle: async ({ remoteJid, sendReply, quoted }) => {
    const memberId =
      quoted?.participant ||
      quoted?.key?.participant ||
      quoted?.sender;

    if (!memberId) {
      await sendReply(
        "🔎 *CHECK ATIVIDADE*\n\nResponda à mensagem de um membro usando o comando !checkati.",
      );
      return;
    }

    const activity = getMemberActivity(remoteJid, memberId);

    if (!activity.messages) {
      await sendReply(
        "🔎 *CHECK ATIVIDADE*\n\nNenhuma atividade registrada para este membro ainda.",
      );
      return;
    }

    const lastActivity = activity.lastActivity
      ? new Date(activity.lastActivity).toLocaleString("pt-BR", {
          timeZone: "America/Fortaleza",
        })
      : "Não registrada";

    await sendReply(
      `🔎 *CHECK ATIVIDADE*\n\n` +
        `👤 Membro: @${memberId.split("@")[0]}\n` +
        `💬 Mensagens registradas: ${activity.messages}\n` +
        `🕒 Última atividade: ${lastActivity}`,
    );
  },
};
