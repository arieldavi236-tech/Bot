import { PREFIX } from "../../config.js";
import { InvalidParameterError, WarningError } from "../../errors/index.js";

export default {
  name: "enquete",
  description: "Cria uma enquete no grupo",
  commands: ["enquete", "poll"],
  usage: `${PREFIX}enquete Pergunta | Opção 1 | Opção 2`,
  handle: async ({
    fullArgs,
    remoteJid,
    socket,
    isGroup,
    sendSuccessReply,
  }) => {
    if (!isGroup) {
      throw new WarningError("Esse comando só pode ser usado em grupos.");
    }

    if (!fullArgs) {
      throw new InvalidParameterError(
        `Exemplo:\n${PREFIX}enquete Qual horário? | 18h | 20h | 22h`
      );
    }

    const parts = fullArgs
      .split("|")
      .map((item) => item.trim())
      .filter(Boolean);

    if (parts.length < 3) {
      throw new InvalidParameterError(
        "Informe uma pergunta e pelo menos duas opções."
      );
    }

    const question = parts.shift();
    const options = parts.slice(0, 12);

    await socket.sendMessage(remoteJid, {
      poll: {
        name: question,
        values: options,
        selectableCount: 1,
      },
    });

    await sendSuccessReply("📊 Enquete criada com sucesso!");
  },
};
