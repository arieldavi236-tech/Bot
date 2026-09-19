/**
 * Menu do bot
 */

import pkg from "../package.json" with { type: "json" };
import { BOT_NAME, OWNER_LID } from "./config.js";
import { getPrefix } from "./utils/database.js";
import { readMore } from "./utils/index.js";

const line = "└❈•≫────≪•◦ ❈ ◦•≫────≪•❈";
const start = "┌┼┈┈┈";
const item = (prefix, command) => `┃┊˚₊· ͟͟͞͞➳${prefix}${command}`;

export function menuMessage(groupJid, category = "") {
  const date = new Date();
  const prefix = getPrefix(groupJid);
  const cat = category.toLowerCase().trim();

  if (!cat) {
return `『 𝐒𝐡𝐢𝐳𝐮𝐤𝐚 𝐦𝐞𝐧𝐮 ♛ 』${readMore()}

┏❈•≫───≪•◦ ❈ ◦•≫───≪•❈
┣┼┈┈┈『 INFO/BOT 』
┃┊
┃┊ 🤖BOT: ${BOT_NAME}
┃┊ 📆DATA: ${date.toLocaleDateString("pt-BR")}
┃┊ ⏰HORA: ${date.toLocaleTimeString("pt-BR")}
┃┊ ⚡PREFIXO: ${prefix}
┃┊ 💎VERSÃO: ${pkg.version}
┃┊ ⚜️DONO OFC: @${OWNER_LID.split("@")[0]}
┃┊
┗❈•≫───≪•◦🇮🇲◦•≫───≪•❈
⏤͟͟͞͞  ⃟ ⃟𝐒𝐡𝐢𝐳𝐮𝐤𝐚 ♛
┌┼┈┈┈『 _ 𝐄𝐒𝐂𝐎𝐋𝐇𝐀 𝐔𝐌 𝐌𝐄𝐍𝐔 妥』
┃┊
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐝𝐢𝐯𝐞𝐫𝐬𝐨𝐬
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐚𝐝𝐦
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐛𝐫𝐢𝐧𝐜𝐚𝐝𝐞𝐢𝐫𝐚𝐬
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐟𝐢𝐠𝐮𝐫𝐢𝐧𝐡𝐚𝐬
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐩𝐞𝐬𝐪𝐮𝐢𝐬𝐚𝐫
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐢𝐚
┃┊˚₊· ͟͟͞͞➳${prefix}𝐦𝐞𝐧𝐮 𝐝𝐨𝐧𝐨
┃┊
└❈•≫───≪•◦ ❈ ◦•≫───≪•❈

        『𝐒𝐡𝐢𝐳𝐮𝐤𝐚 *v${pkg.version}* 』`;

}

  if (["diversos", "diverso"].includes(cat)) {
    return `『 _𝐃𝐈𝐕𝐄𝐑𝐒𝐎𝐒 𝐌𝐄𝐍𝐔 ♛_ 』

${start}『 _*DIVERSOS*_ 』
${item(prefix, "attp")}
${item(prefix, "brat")}
${item(prefix, "bratvid")}
${item(prefix, "cep")}
${item(prefix, "fake-chat")}
${item(prefix, "gerar-link")}
${item(prefix, "perfil")}
${item(prefix, "rename")}
${item(prefix, "removebg")}
${item(prefix, "to-gif")}
${item(prefix, "to-image")}
${item(prefix, "to-mp3")}
${item(prefix, "transcrever")}
${item(prefix, "ttp")}
${line}`;
  }

  if (["adm", "admin", "admins"].includes(cat)) {
    return `『 _𝐌𝐄𝐍𝐔 𝐀𝐃𝐌 ♛_ 』

${start}『 _*ADMINISTRAÇÃO*_ 』
${item(prefix, "abrir")}
${item(prefix, "fechar")}
${item(prefix, "ban")}
${item(prefix, "promover")}
${item(prefix, "rebaixar")}
${item(prefix, "delete")}
${item(prefix, "mute")}
${item(prefix, "unmute")}
${item(prefix, "hidetag")}
${item(prefix, "marcartodos")}
${item(prefix, "marcaroculto")}
${item(prefix, "adms")}
${item(prefix, "infogrupo")}
${item(prefix, "membros")}
${item(prefix, "link-grupo")}
${item(prefix, "limpar-chat")}
${item(prefix, "welcome 1/0")}
${item(prefix, "only-admin 1/0")}
${item(prefix, "warn")}
${item(prefix, "unwarn")}
${item(prefix, "listanegra")}
${item(prefix, "tirarlistanegra")}
${item(prefix, "verlistanegra")}
${line}

${start}『 _*ANTIS*_ 』
${item(prefix, "anti-link 1/0")}
${item(prefix, "anti-sticker 1/0")}
${item(prefix, "anti-image 1/0")}
${item(prefix, "anti-video 1/0")}
${item(prefix, "anti-audio 1/0")}
${item(prefix, "anti-document 1/0")}
${item(prefix, "anti-call 1/0")}
${item(prefix, "anti-event 1/0")}
${item(prefix, "anti-payment 1/0")}
${item(prefix, "anti-product 1/0")}
${item(prefix, "anti-status-grupo 1/0")}
${item(prefix, "anti-lottie-sticker 1/0")}
${line}`;
  }

  if (["brincadeiras", "brincadeira", "jogos"].includes(cat)) {
    return `『 _𝐌𝐄𝐍𝐔 𝐁𝐑𝐈𝐍𝐂𝐀𝐃𝐄𝐈𝐑𝐀𝐒 ♛_ 』

${start}『 _*JOGOS/INTERAÇÕES*_ 』
${item(prefix, "abracar")}
${item(prefix, "beijar")}
${item(prefix, "dado")}
${item(prefix, "jantar")}
${item(prefix, "lutar")}
${item(prefix, "matar")}
${item(prefix, "socar")}
${item(prefix, "tapa")}
${line}`;
  }

  if (["figurinhas", "figurinha", "sticker"].includes(cat)) {
    return `『 _𝐌𝐄𝐍𝐔 𝐅𝐈𝐆𝐔𝐑𝐈𝐍𝐇𝐀𝐒 ♛_ 』

${start}『 _*FIGURINHAS*_ 』
${item(prefix, "sticker")}
${item(prefix, "attp")}
${item(prefix, "ttp")}
${item(prefix, "ia-sticker")}
${item(prefix, "brat")}
${item(prefix, "bratvid")}
${item(prefix, "to-image")}
${item(prefix, "to-gif")}
${item(prefix, "rename")}
${line}`;
  }

  if (["pesquisar", "pesquisa", "baixar", "downloads"].includes(cat)) {
    return `『 _𝐏𝐄𝐒𝐐𝐔𝐈𝐒𝐀𝐑/𝐁𝐀𝐈𝐗𝐀𝐑 ♛_ 』

${start}『 _*PESQUISAR*_ 』
${item(prefix, "yt-search")}
${


item(prefix, "cep")}
${line}

${start}『 _*DOWNLOADS*_ 』
${item(prefix, "facebook")}
${item(prefix, "instagram")}
${item(prefix, "pinterest")}
${item(prefix, "play-audio")}
${item(prefix, "play-video")}
${item(prefix, "tik-tok")}
${item(prefix, "tik-tok-audio")}
${item(prefix, "x-twitter")}
${item(prefix, "yt-mp3")}
${item(prefix, "yt-mp4")}
${line}`;
  }

  if (["ia", "inteligencia"].includes(cat)) {
    return `『 _𝐌𝐄𝐍𝐔 𝐈𝐀 ♛_ 』

${start}『 _*INTELIGÊNCIA ARTIFICIAL*_ 』
${item(prefix, "deepseek")}
${item(prefix, "gemini")}
${item(prefix, "gpt-5-mini")}
${item(prefix, "flux")}
${item(prefix, "ia-sticker")}
${item(prefix, "tts")}
${item(prefix, "transcrever")}
${line}`;
  }

  if (["dono", "owner"].includes(cat)) {
    return `『 _𝐌𝐄𝐍𝐔 𝐃𝐎𝐍𝐎 ♛_ 』

${start}『 _*DONO*_ 』
${item(prefix, "exec")}
${item(prefix, "get-group-id")}
${item(prefix, "off")}
${item(prefix, "on")}
${item(prefix, "set-menu-image")}
${item(prefix, "set-prefix")}
${item(prefix, "set-spider-api-token")}
${item(prefix, "testing")}
${line}`;
  }

  return `❌ Menu não encontrado.

Use ${prefix}menu para ver as categorias disponíveis.`;
}
