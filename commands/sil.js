const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.roles.cache.has("746828691933364374") && !message.member.hasPermission('ADMINISTRATOR'))
  return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok.");
if(!args[0]) return message.channel.send(" **Lütfen Silinicek Mesaj Miktarını Yazın.** ");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`**${args[0]} Adet Mesaj Silindi.\n Mesajı Silen Yetkili: <@${message.author.id}>**`).then(msg => msg.delete({timeout: 5000}));
  
})
}
exports.config = {
  name: "sil",
  guildOnly: true,
  aliases: [],
 
};