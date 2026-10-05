import { PREFIX } from "../../../config.js";
import { InvalidParameterError } from "../../../errors/index.js";
import { Ffmpeg } from "../../../services/ffmpeg.js";

export default {
  name: "flip",
  description: "Inverte uma imagem verticalmente.",
  commands: ["flip", "inverter"],
  usage: `${PREFIX}flip (responda ou marque uma imagem)`,
  handle: async ({
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

    await sendWaitReact();

    const filePath = await downloadImage(webMessage);
    const ffmpeg = new Ffmpeg();

    try {
      const outputPath = await ffmpeg.flipVertical(filePath);
      await sendSuccessReact();
      await sendImageFromFile(outputPath);
      await ffmpeg.cleanup(outputPath);
    } finally {
      await ffmpeg.cleanup(filePath);
    }
  },
};
