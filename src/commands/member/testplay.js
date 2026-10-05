import { PREFIX } from "../../config.js";

export default {
  name: "testplay",
  description: "Testa envio de áudio baixado",
  commands: ["testplay"],
  usage: `${PREFIX}testplay`,
  handle: async ({ sendAudioFromFile, sendSuccessReply, sendErrorReply }) => {
    try {
      await sendAudioFromFile("temp/play/test.mp3");
      await sendSuccessReply("🎵 Áudio enviado com sucesso!");
    } catch (error) {
      console.error(error);
      await sendErrorReply(`Erro ao enviar áudio: ${error.message}`);
    }
  },
};
