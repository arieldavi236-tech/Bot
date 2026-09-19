/**
 * Logs
 *
 * @author Dev Gui
 */
import pkg from "../../package.json" with { type: "json" };

let consoleNoiseFilterInstalled = false;

export function installConsoleNoiseFilter() {
  if (consoleNoiseFilterInstalled) {
    return;
  }

  const originalConsoleInfo = console.info.bind(console);

  console.info = (...args) => {
    if (args[0] === "Closing session:") {
      warningLog(
        "O WhatsApp fechou uma sessão criptografada antiga para renovar as chaves. Isso é um aviso normal da conexão e não indica erro no bot.",
      );
      return;
    }

    if (args[0] === "Removing old closed session:") {
      warningLog(
        "O WhatsApp removeu uma sessão criptografada antiga já fechada. Isso é limpeza normal do histórico de chaves e não indica erro no bot.",
      );
      return;
    }

    originalConsoleInfo(...args);
  };

  consoleNoiseFilterInstalled = true;
}

export function sayLog(message) {
  console.log("\x1b[36m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | TALK]\x1b[0m", message);
}

export function inputLog(message) {
  console.log("\x1b[30m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | INPUT]\x1b[0m", message);
}

export function infoLog(message) {
  console.log("\x1b[34m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | INFO]\x1b[0m", message);
}

export function successLog(message) {
  console.log("\x1b[32m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | SUCCESS]\x1b[0m", message);
}

export function errorLog(message) {
  console.log("\x1b[31m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | ERROR]\x1b[0m", message);
}

export function warningLog(message) {
  console.log("\x1b[33m[𝐒𝐡𝐢𝐳𝐮𝐤𝐚 BOT | WARNING]\x1b[0m", message);
}
export function bannerLog() {
  console.log(`\x1b[36m╔══════════════════════════════════╗\x1b[0m`);
  console.log(`\x1b[36m║        𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛              ║\x1b[0m`);
  console.log(`\x1b[36m║        𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑩𝒐𝒕             ║\x1b[0m`);
  console.log(`\x1b[36m╚══════════════════════════════════╝\x1b[0m`);
  console.log(`\x1b[36m        🤖 Versão: \x1b[0m${pkg.version}\n`);
}


