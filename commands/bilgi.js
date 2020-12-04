const Discord = require("discord.js"),
client = new Discord.Client()
const db = require("quick.db");

module.exports.run = async (client, message, args, prefix) => {

  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
message.channel.send(new Discord.MessageEmbed().setTitle(`${message.author.tag} kullanıcının bilgileri`).setDescription(`**Bir Sonraki Level'e Kaç Gif Veya Resim'de Ulaşacagınızı Görmek İçin <#752205590138454090> Kanalını Ziyaret Edebilirsiniz.** \n\n<a:gifdra_cizgi:752211503834202173> <a:gifdra_cizgi:752211503834202173> <a:gifdra_cizgi:752211503834202173> <a:gifdra_cizgi:752211503834202173> <a:gifdra_cizgi:752211503834202173>\n\n\`\`\`Resim Sayısı: ${db.get(`kullanici.${message.author.id}.resimSayisi`) ? db.get(`kullanici.${message.author.id}.resimSayisi`) : "Mevcut Değil Hiç Atmamış."}\n\nGif Sayısı: ${db.get(`kullanici.${message.author.id}.gifSayisi`) ? db.get(`kullanici.${message.author.id}.gifSayisi`) : "Mevcut Değil Hiç Atmamış."}\n\nToplam Sayı: ${db.get(`kullanici.${message.author.id}.resimSayisi`) + db.get(`kullanici.${message.author.id}.gifSayisi`) ? db.get(`kullanici.${message.author.id}.resimSayisi`) + db.get(`kullanici.${message.author.id}.gifSayisi`) : "Mevcut Değil Hiç Atmamış."}\`\`\``))
};

exports.config = {
  name: "bilgi",
  guildOnly: true,
  aliases: [],
 
};
