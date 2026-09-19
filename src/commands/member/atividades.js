import { PREFIX } from "../../config.js";
import { getGroupActivityRanking } from "../../utils/database.js";

export default {
  name: "atividades",
  description: "Mostra o resumo de atividades do grupo.",
  commands: ["atividades", "atividade"],
  usage: `${PREFIX}atividades`,

  handle: async ({ remoteJid, sendReply }) => {
    const ranking = getGroupActivityRanking(remoteJid);

    if (!ranking.length) {
      await sendReply(
        "📊 *ATIVIDADES DO GRUPO*\n\nAinda não existem atividades registradas neste grupo.",
      );
      return;
    }

    const totalMessages = ranking.reduce(
      (total, member) => total + member.messages,
      0,
    );

    const mostActive = ranking[0];

    await sendReply(
      `📊 *ATIVIDADES DO GRUPO*\n\n` +
        `👥 Membros registrados: ${ranking.length}\n` +
        `💬 Mensagens registradas: ${totalMessages}\n` +
        `🔥 Maior atividade: ${mostActive.messages} mensagens`,
    );
  },
};
