const path = require("path");

const PREFIX = "/";
const BOT_EMOJI = "🤖";
const BOT_NAME = "Super Bot";
const TEMP_FOLDER = path.resolve(__dirname, "..", "assets", "temp");

const OPENAI_API_KEY = "";

module.exports = {
  BOT_EMOJI,
  BOT_NAME,
  PREFIX,
  TEMP_FOLDER,
  OPENAI_API_KEY,
};
