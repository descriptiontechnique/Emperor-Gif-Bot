const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async(client, message, args)=>{
 
  let kisi = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
  let uyar = db.get(`uyar.${kisi.id}`)
  message.channel.send(new Discord.MessageEmbed().setDescription(`${uyar ? uyar.map((x, index) => `\`${(index+1)}.\` **${x.neden}** nedeniyle <@${x.kisi}> tarafından uyarıldı.`).join("\n") :"Hiç uyarısı bulunmuyor."}`))
  };

exports.config = {
  name: "uyarılar",
  guildOnly: true,
  aliases: [],
 
};