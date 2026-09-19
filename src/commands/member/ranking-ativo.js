import { PREFIX } from "../../config.js";
import { getGroupActivityRanking } from "../../utils/database.js";

export default {
  name: "ranking-ativo",
  description: "Mostra o ranking dos membros mais ativos do grupo.",
  commands: ["rankingativo", "ranking-ativo"],
  usage: `${PREFIX}rankingativo`,

  handle: async ({ remoteJid, sendReply }) => {
    const ranking = getGroupActivityRanking(remoteJid);

    if (!ranking.length) {
      await sendReply(
        "🏆 *RANKING DE ATIVIDADE*\n\nAinda não existem atividades registradas neste grupo.",
      );
      return;
    }

    const topMembers = ranking.slice(0, 10);

    const medals = ["🥇", "🥈", "🥉"];

    const rankingText = topMembers
      .map((member, index) => {
        const position = medals[index] || `*${index + 1}.*`;

        return `${position} @${member.memberId.split("@")[0]} — ${member.messages} mensagens`;
      })
      .join("\n");

    await sendReply(
      `🏆 *RANKING DE ATIVIDADE*\n\n${rankingText}\n\n` +
        `📊 Total de membros registrados: ${ranking.length}`,
    );
  },
};
