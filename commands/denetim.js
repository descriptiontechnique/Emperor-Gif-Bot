const Discord = require('discord.js');
const db = require("quick.db");
exports.run = function(client, message, args) {
if(!message.member.roles.cache.has("746828691933364374") && !message.member.hasPermission('ADMINISTRATOR')) return

let role = message.mentions.roles.first()
if(!role) return message.channel.send("Denetlenecek rolü etiketlemelisin.")
message.channel.send(message.guild.members.cache.filter(a => a.roles.cache.has(role.id)).map(b => `**${b.user.username}** adlı yetkilinin gif istatistikleri:\n\n\n\`\`\`Resim Sayısı: ${db.get(`kullanici.${b.id}.resimSayisi`) ? db.get(`kullanici.${b.id}.resimSayisi`) : "0"}\nGif Sayısı:  ${db.get(`kullanici.${b.id}.gifSayisi`) ? db.get(`kullanici.${b.id}.gifSayisi`) : "0"}\`\`\` `).join("\n"))

}
exports.config = {
  name: "denetim",
  guildOnly: true,
  aliases: [],
};