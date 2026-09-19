const { execFile } = require("child_process");

const BOT_NAME = "ariel-bot";
const CHECK_INTERVAL = 30000;

function pm2(args) {
  return new Promise((resolve) => {
    execFile("pm2", args, (error, stdout, stderr) => {
      resolve(stdout || stderr || String(error || ""));
    });
  });
}

async function checkBot() {
  try {
    const result = await pm2(["jlist"]);
    const processes = JSON.parse(result);

    const bot = processes.find((p) => p.name === BOT_NAME);

    if (!bot) {
      console.log(`[WATCHDOG] ${BOT_NAME} não encontrado. Iniciando...`);
      await pm2(["start", BOT_NAME]);
      return;
    }

    const status = bot.pm2_env?.status;

    if (status !== "online") {
      console.log(
        `[WATCHDOG] ${BOT_NAME} está ${status}. Recuperando...`,
      );

      await pm2(["restart", BOT_NAME]);
      return;
    }

    console.log(`[WATCHDOG] ${BOT_NAME} está online.`);
  } catch (error) {
    console.log("[WATCHDOG] Erro:", error.message);
  }
}

console.log("╭──────────────────────────────╮");
console.log("│     Shizuka Watchdog ♛       │");
console.log("│     Monitoramento iniciado    │");
console.log("╰──────────────────────────────╯");

checkBot();
setInterval(checkBot, CHECK_INTERVAL);
