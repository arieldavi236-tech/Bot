import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { getAnimeResults } from "../../../utils/anime/api.js";

export default {
  name: "animerandom",
  description: "Escolhe um anime aleatoriamente.",
  commands: ["animerandom"],
  usage: `${PREFIX}animerandom <nome>`,
  handle: async ({ fullArgs, sendReply }) => {
    if (!fullArgs?.trim()) throw new InvalidParameterError(`Use: ${PREFIX}animerandom Naruto`);

    const list = await getAnimeResults(fullArgs.trim(), 10);
    if (!list.length) throw new InvalidParameterError("Nenhum anime encontrado.");

    const a = list[Math.floor(Math.random() * list.length)];
    const titulo = a.title?.english || a.title?.romaji || a.title?.native || "?";

    await sendReply(
      [
        "╭━━━「 🎲 ANIME RANDOM 」━━━╮",
        `┃ ✦ ${titulo}`,
        `┃ ⭐ ${a.averageScore ?? "?"}/100`,
        "╰━━「 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛ 」━━╯"
      ].join("\n")
    );
  },
};