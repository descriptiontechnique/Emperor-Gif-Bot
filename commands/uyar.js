const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")
const kdb = new db.table("kullanici");

module.exports.run = async (client, message, args) => {
 if(!message.member.roles.cache.has("752205549260505138") &&  !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(`Bu komutu kullanmaya yetkin yok!`);let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if(!user) return message.reply("Uyarılacak kişiyi etiketlemelisin.")
let neden = args.slice(1).join(" ")
if(!neden)return message.reply("Uyarılacak kişinin neden uyarıldığınıda yazmalısın.")
let sayi =  db.get(`uyari.${user.id}`) 
let r1 = "752205569246494740" //uyarı rolleri
let r2 = "752205570219573308" //uyarı rolleri
let r3 = "752205570924085369" //uyarı rolleri
if(sayi === null || sayi === undefined){
await db.add(`uyari.${user.id}`,1)
await user.roles.add(r1)
kdb.push(`kullanici.${user.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "UYARI",
      Sebep: neden,
      Zaman: Date.now()
    });
 message.channel.send(new Discord.MessageEmbed().setDescription(`${user} adlı üye Gif Hearts'dan **${neden}** nedeniyle uyarıldı.\n**Uyarı Sayısı:** ${db.get(`uyari.${user.id}`)}`))
db.push(`uyar.${user.id}`,{neden:neden, kisi:message.author.id})
}
if(sayi === 1 ){
kdb.push(`kullanici.${user.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "UYARI",
      Sebep: neden,
      Zaman: Date.now()
    });
await db.add(`uyari.${user.id}`,1)
await user.roles.add(r2)
await message.channel.send(new Discord.MessageEmbed().setDescription(`${user} adlı üye Gif Hearts'dan **${neden}** nedeniyle uyarıldı.\n**Uyarı Sayısı:** ${db.get(`uyari.${user.id}`)}`))
db.push(`uyar.${user.id}`,{neden:neden, kisi:message.author.id})
}
if(sayi >= 2){
kdb.push(`kullanici.${user.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "UYARI",
      Sebep: neden,
      Zaman: Date.now()
    });
await db.add(`uyari.${user.id}`,1)
await user.roles.add(r3)
await message.channel.send(new Discord.MessageEmbed().setDescription(`${user} adlı üye Gif Hearts'dan **${neden}** nedeniyle uyarıldı.\n**Uyarı Sayısı:** ${db.get(`uyari.${user.id}`)}`))
db.push(`uyar.${user.id}`,{neden:neden, kisi:message.author.id})
}
};

exports.config = {
  name: "uyar",
  guildOnly: true,
  aliases: [],
 
};