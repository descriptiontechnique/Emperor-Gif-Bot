const Discord = require("discord.js"),
client = new Discord.Client()
const db = require("quick.db");

module.exports.run = async (client, message, args, prefix) => {
let top = message.guild.members.cache.filter(uye => db.get(`kullanici.${uye.id}.toplamSayi`)).array().sort((uye1, uye2) => Number(db.get(`kullanici.${uye2.id}.toplamSayi`))-Number(db.get(`kullanici.${uye1.id}.toplamSayi`))).map((uye, index) => `\`\`\`${index+1}. ${uye.user.username} - G:${db.get(`kullanici.${uye.id}.gifSayisi`) ? db.get(`kullanici.${uye.id}.gifSayisi`) :"0"} - R:${db.get(`kullanici.${uye.id}.resimSayisi`) ? db.get(`kullanici.${uye.id}.resimSayisi`) :"0"} - T:${db.get(`kullanici.${uye.id}.toplamSayi`) ? db.get(`kullanici.${uye.id}.toplamSayi`) : "0"}\`\`\``).join('\n'); 
message.channel.send(new Discord.MessageEmbed().setTitle('Top10 Gif List').setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top)); 
 
};

exports.config = {
  name: "top10",
  guildOnly: true,
  aliases: [],
 
};
