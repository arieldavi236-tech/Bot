import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { Ffmpeg } from "../../../services/ffmpeg.js";

export default {
  name: "crop",
  description: "Recorta uma imagem em formato quadrado.",
  commands: ["crop", "recortar"],
  usage: `${PREFIX}crop 512 (responda ou marque uma imagem)`,
  handle: async ({
    args,
    isImage,
    downloadImage,
    sendSuccessReact,
    sendWaitReact,
    sendImageFromFile,
    webMessage,
  }) => {
    if (!isImage) {
      throw new InvalidParameterError(
        "Você precisa marcar uma imagem ou responder a uma imagem"
      );
    }

    const size = Number(args?.[0] || 512);

    if (!Number.isInteger(size) || size < 1) {
      throw new InvalidParameterError("Use um tamanho válido, exemplo: 512");
    }

    await sendWaitReact();

    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.cropImage(filePath, size);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
      await ffmpeg.cleanup(outputPath);
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
