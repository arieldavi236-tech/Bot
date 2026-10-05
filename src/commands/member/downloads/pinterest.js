import { delay } from "baileys";
import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { errorLog } from "../../../utils/logger.js";

export default {
  name: "pinterest",
  description: "Busca imagens no Pinterest e envia separadamente.",
  commands: ["pinterest", "pin"],
  usage: `${PREFIX}pinterest gatos fofos`,

  handle: async ({
    fullArgs,
    sendWaitReact,
    sendSuccessReact,
    sendErrorReply,
    sendImageFromURL,
  }) => {
    if (!fullArgs?.trim()) {
      throw new InvalidParameterError(
        `Use: ${PREFIX}pinterest <o que deseja buscar>`,
      );
    }

    await sendWaitReact();

    try {
      const pesquisa = fullArgs.trim();

      const apiUrl =
        `https://pinterest-api-bay.vercel.app/v5/pins/search` +
        `?query=${encodeURIComponent(pesquisa)}` +
        `&count=3&compact=true`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Pinterest retornou HTTP ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data?.items) || !data.items.length) {
        await sendErrorReply(
          `❌ Nenhuma imagem encontrada para: ${pesquisa}`,
        );
        return;
      }

      const images = data.items
        .filter(
          (item) =>
            typeof item?.image === "string" &&
            item.image.startsWith("http"),
        )
        .slice(0, 3);

      if (!images.length) {
        await sendErrorReply(
          "❌ Não encontrei imagens válidas para enviar.",
        );
        return;
      }

      await sendSuccessReact();

      for (const [index, item] of images.entries()) {
        await sendImageFromURL(
          item.image,
          [
            `📌 *Pinterest*`,
            "",
            `🔎 Pesquisa: ${pesquisa}`,
            `🖼️ Resultado: ${index + 1}/${images.length}`,
            item.title ? `📖 ${item.title}` : "",
            "",
            "𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛",
          ]
            .filter(Boolean)
            .join("\n"),
        );

        if (index < images.length - 1) {
          await delay(500);
        }
      }
    } catch (error) {
      errorLog(
        `[PINTEREST] ${error?.stack || error?.message || error}`,
      );

      await sendErrorReply(
        "❌ Não consegui buscar imagens no Pinterest agora.",
      );
    }
  },
};
