const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000;

app.use(express.json());

function pm2(command) {
  return new Promise((resolve) => {
    exec(`pm2 ${command}`, (error, stdout, stderr) => {
      resolve(stdout || stderr || String(error || ""));
    });
  });
}

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Shizuka Host ♛</title>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #0d0d12;
  color: #eee;
  font-family: Arial, sans-serif;
  padding: 20px;
}

.container {
  max-width: 500px;
  margin: auto;
}

h1 {
  text-align: center;
  font-size: 25px;
  margin-bottom: 25px;
}

.card {
  background: #17171f;
  border: 1px solid #30303b;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 30px #0005;
}

.status {
  font-size: 18px;
  margin: 10px 0 20px;
}

.online {
  color: #55e889;
}

.offline {
  color: #ff6262;
}

.info {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #292933;
  padding: 12px 0;
}

.buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

button {
  border: 0;
  border-radius: 10px;
  padding: 13px;
  font-size: 15px;
  font-weight: bold;
  background: #272733;
  color: white;
}

button:active {
  transform: scale(.97);
}

.logs {
  margin-top: 20px;
  background: #09090d;
  padding: 12px;
  border-radius: 10px;
  font-size: 12px;
  white-space: pre-wrap;
  max-height: 250px;
  overflow: auto;
}

.footer {
  text-align: center;
  margin-top: 20px;
  color: #777;
  font-size: 12px;
}
</style>
</head>

<body>

<div class="container">

<h1>𝐒𝐡𝐢𝐳𝐮𝐤𝐚 Host ♛</h1>

<div class="card">

<h2>🤖 Ariel Bot</h2>

<div id="status" class="status">
Carregando...
</div>

<div class="info">
<span>Processo</span>
<strong>ariel-bot</strong>
</div>

<div class="info">
<span>Memória</span>
<strong id="memory">-</strong>
</div>

<div class="info">
<span>Uptime</span>
<strong id="uptime">-</strong>
</div>

<div class="buttons">

<button onclick="action('start')">
▶️ LIGAR
</button>

<button onclick="action('restart')">
🔄 REINICIAR
</button>

<button onclick="action('stop')">
⏹️ PARAR
</button>

<button onclick="loadStatus()">
🔃 ATUALIZAR
</button>

</div>

<div class="logs" id="logs">
Logs aparecerão aqui...
</div>

</div>

<div class="footer">
Shizuka Host ♛ • Local
</div>

</div>

<script>

async function loadStatus() {

  try {

    const response = await fetch('/status');
    const data = await response.json();

    const status = document.getElementById('status');

    if (data.online) {
      status.innerHTML = '🟢 ONLINE';
      status.className = 'status online';
    } else {
      status.innerHTML = '🔴 OFFLINE';
      status.className = 'status offline';
    }

    document.getElementById('memory').innerText =
      data.memory || '-';

    document.getElementById('uptime').innerText =
      data.uptime || '-';

    document.getElementById('logs').innerText =
      data.logs || 'Sem logs.';

  } catch (e) {

    document.getElementById('status').innerText =
      '⚠️ Erro ao conectar';

  }

}

async function action(type) {

  document.getElementById('status').innerText =
    '⏳ Processando...';

  await fetch('/action/' + type, {
    method: 'POST'
  });

  setTimeout(loadStatus, 1000);

}

loadStatus();

setInterval(loadStatus, 5000);

</script>

</body>
</html>
`);
});

app.get("/status", async (req, res) => {

  const result = await pm2("jlist");

  try {

    const processes = JSON.parse(result);

    const bot = processes.find(p => p.name === "ariel-bot");

    if (!bot) {
      return res.json({
        online: false,
        memory: "-",
        uptime: "-",
        logs: "Processo ariel-bot não encontrado."
      });
    }

    const online = bot.pm2_env.status === "online";

    const memory =
      bot.monit?.memory
        ? Math.round(bot.monit.memory / 1024 / 1024) + " MB"
        : "-";

    let uptime = "-";

    if (bot.pm2_env.pm_uptime) {
      const seconds =
        Math.floor((Date.now() - bot.pm2_env.pm_uptime) / 1000);

      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;

      uptime =
        `${String(h).padStart(2,"0")}:` +
        `${String(m).padStart(2,"0")}:` +
        `${String(s).padStart(2,"0")}`;
    }

    const logs = await pm2("logs ariel-bot --lines 20 --nostream");

    res.json({
      online,
      memory,
      uptime,
      logs
    });

  } catch {

    res.json({
      online: false,
      memory: "-",
      uptime: "-",
      logs: result
    });

  }

});

app.post("/action/start", async (req, res) => {
  await pm2("start ariel-bot");
  res.json({ ok: true });
});

app.post("/action/restart", async (req, res) => {
  await pm2("restart ariel-bot");
  res.json({ ok: true });
});

app.post("/action/stop", async (req, res) => {
  await pm2("stop ariel-bot");
  res.json({ ok: true });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("╭────────────────────────────╮");
  console.log("│   𝐒𝐡𝐢𝐳𝐮𝐤𝐚 Host ♛          │");
  console.log("│   Painel iniciado!          │");
  console.log("╰────────────────────────────╯");
  console.log("");
  console.log(`Abra no Chrome: http://localhost:${PORT}`);
  console.log("");
});
