import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATABASE_DIR = path.join(__dirname, "../../database");
const DATABASE_FILE = path.join(DATABASE_DIR, "aluguel.json");

function garantirBanco() {
  if (!fs.existsSync(DATABASE_DIR)) {
    fs.mkdirSync(DATABASE_DIR, { recursive: true });
  }

  if (!fs.existsSync(DATABASE_FILE)) {
    fs.writeFileSync(DATABASE_FILE, "{}", "utf8");
  }
}

function lerBanco() {
  garantirBanco();

  try {
    return JSON.parse(fs.readFileSync(DATABASE_FILE, "utf8"));
  } catch {
    return {};
  }
}

function salvarBanco(database) {
  garantirBanco();

  fs.writeFileSync(
    DATABASE_FILE,
    JSON.stringify(database, null, 2),
    "utf8"
  );
}

export function criarAluguel(remoteJid, dias) {
  const database = lerBanco();

  const agora = Date.now();
  const vencimento = agora + dias * 24 * 60 * 60 * 1000;

  database[remoteJid] = {
    ativo: true,
    iniciadoEm: agora,
    vencimentoEm: vencimento,
    diasContratados: dias,
  };

  salvarBanco(database);

  return database[remoteJid];
}

export function obterAluguel(remoteJid) {
  const database = lerBanco();
  return database[remoteJid] || null;
}

export function obterDiasRestantes(remoteJid) {
  const aluguel = obterAluguel(remoteJid);

  if (!aluguel) {
    return 0;
  }

  const restante = aluguel.vencimentoEm - Date.now();

  if (restante <= 0) {
    return 0;
  }

  return Math.ceil(restante / (24 * 60 * 60 * 1000));
}

export function aluguelExpirou(remoteJid) {
  const aluguel = obterAluguel(remoteJid);

  if (!aluguel) {
    return false;
  }

  return Date.now() >= aluguel.vencimentoEm;
}

export function renovarAluguel(remoteJid, dias) {
  const database = lerBanco();
  const aluguel = database[remoteJid];

  if (!aluguel) {
    return criarAluguel(remoteJid, dias);
  }

  const agora = Date.now();

  const base =
    aluguel.vencimentoEm > agora
      ? aluguel.vencimentoEm
      : agora;

  aluguel.vencimentoEm =
    base + dias * 24 * 60 * 60 * 1000;

  aluguel.ativo = true;

  salvarBanco(database);

  return aluguel;
}

export function cancelarAluguel(remoteJid) {
  const database = lerBanco();

  if (!database[remoteJid]) {
    return false;
  }

  delete database[remoteJid];

  salvarBanco(database);

  return true;
}
