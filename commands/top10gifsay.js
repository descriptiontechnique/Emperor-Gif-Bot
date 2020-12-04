const Discord = require("discord.js"),
client = new Discord.Client()
const db = require("quick.db");

module.exports.run = async (client, message, args) => {

let top = message.guild.members.cache.filter(uye => db.get(`kullanici.${uye.id}.gifSayisi`)).array().sort((uye1, uye2) => Number(db.get(`kullanici.${uye2.id}.gifSayisi`))-Number(db.get(`kullanici.${uye1.id}.gifSayisi`))).map((uye, index) => `\`\`\`${index+1}. ${uye.user.username} - G:${db.get(`kullanici.${uye.id}.gifSayisi`) ? db.get(`kullanici.${uye.id}.gifSayisi`) :"0"} - R:${db.get(`kullanici.${uye.id}.resimSayisi`) ? db.get(`kullanici.${uye.id}.resimSayisi`) : "0"}\`\`\``).join('\n'); 
message.channel.send(new Discord.MessageEmbed().setTitle('Top10 Gif List').setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top ? top : "Sıralanacak veri bulunamadı.")); 
 
};

exports.config = {
  name: "ensontop10",
  guildOnly: true,
  aliases: [],
 
};
