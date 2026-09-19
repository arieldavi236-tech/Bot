/**
 * Ping completo do Shizuka Bot
 *
 * Mostra:
 * - Status
 * - Latência
 * - Velocidade de resposta
 * - Uptime
 * - Memória do processo
 * - Node.js
 * - Arquitetura
 * - Data e horário
 */

import { PREFIX } from "../../config.js";

export default {
  name: "ping",

  description:
    "Verificar se o bot está online, latência, memória e tempo de atividade.",

  commands: ["ping", "pong"],

  usage: `${PREFIX}ping`,

  /**
   * @param {CommandHandleProps} props
   */
  handle: async ({
    sendReply,
    sendReact,
    startProcess,
    fullMessage,
  }) => {
    await sendReact("🏓");

    // Calcula a latência
    const ping = Date.now() - startProcess;

    // Uptime do processo
    const uptime = process.uptime();

    const h = Math.floor(uptime / 3600);
    const m = Math.floor((uptime % 3600) / 60);
    const s = Math.floor(uptime % 60);

    // Memória do processo
    const memory = process.memoryUsage();

    const heapUsed = memory.heapUsed / 1024 / 1024;
    const heapTotal = memory.heapTotal / 1024 / 1024;
    const rss = memory.rss / 1024 / 1024;

    const memoryUsage = Math.round((heapUsed / heapTotal) * 100);

    // Data e horário
    const now = new Date();

    const date = now.toLocaleDateString("pt-BR");

    const time = now.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    // Classificação da latência
    let latencyStatus = "BAIXA";

    if (ping >= 1000) {
      latencyStatus = "ALTO";
    } else if (ping >= 500) {
      latencyStatus = "MÉDIA";
    }

    // Ping ou Pong
    const response = fullMessage.slice(1).startsWith("ping")
      ? "🏓 Ping!"
      : "🏓 Pong!";

    await sendReply(`╔══════════════════════════════╗
║      『 *𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛* 』      ║
╠══════════════════════════════╣
║ ⌬ ${response}
║ ⌬ *Status:* ✅ Online e operacional
║ ⌬ *Latência:* ${ping}ms — ${latencyStatus}
║ ⌬ *Velocidade:* ${ping}ms — resposta medida
║ ⌬ *Uptime:* ${h}h ${m}m ${s}s
╠══════════════════════════════╣
║ 🧠 *Memória do processo*
║ ├ Heap: ${heapUsed.toFixed(1)} MB / ${heapTotal.toFixed(1)} MB
║ ├ RSS: ${rss.toFixed(1)} MB
║ └ Uso: ${memoryUsage}%
╠══════════════════════════════╣
║ ⚙️ *Ambiente*
║ ├ Node.js: ${process.version}
║ ├ Arquitetura: ${process.arch}
║ └ Horário: ${date} às ${time}
╠══════════════════════════════╣
║ ✦ Sistema estável e pronto. ✦
╚══════════════════════════════╝`);
  },
};
