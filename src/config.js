const path = require("path");

// Prefixo dos comandos
exports.PREFIX = "/";
exports.BOT_EMOJI = "🤖";

// Nome do bot (mude se preferir)
exports.BOT_NAME = "Sky Bot";

// Número do bot
exports.BOT_NUMBER = "5511920202020";

exports.COMMANDS_DIR = path.join(__dirname, "commands");
exports.TEMP_DIR = path.resolve(__dirname, "..", "assets", "temp");

exports.TIMEOUT_IN_MILLISECONDS_BY_EVENT = 700;

exports.SPIDER_API_BASE_URL = "https://api.spiderx.com.br/api";

// Obtenha seu token, criando uma conta em: https://api.spiderx.com.br
exports.SPIDER_API_TOKEN = "jAnpys5LWZfGoLRsmu24";

exports.OPENAI_API_KEY = "";
