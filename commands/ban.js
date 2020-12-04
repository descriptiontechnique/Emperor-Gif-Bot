const { MessageEmbed } = require("discord.js");
const qdb = require('quick.db');
const kdb = new qdb.table("kullanici");

module.exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter("Gif Herat").setTimestamp();
  if(!message.member.roles.cache.has("752205545942810724") && !message.member.roles.cache.has("752205538875408474")) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  
  if(args[0] && args[0].includes('list')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
	  } catch (err) { message.channel.send(`Yasaklı kullanıcı bulunmamakta!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };
  
  if (args[0] && (args[0].includes('bilgi') || args[0].includes('sorgu'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!`)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
  };
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!user) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      kdb.add(`kullanici.${message.author.id}.ban`, 1);
      kdb.push(`kullanici.${user.id}.sicil`, {
        Yetkili: message.author.id,
        Tip: "BAN",
        Sebep: reason,
        Zaman: Date.now()
      });
      if(client.channels.cache.has("769585581185171486")) client.channels.cache.get("769585581185171486").send(new MessageEmbed().setTimestamp().setFooter("Gif Heart").setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${message.author} (${message.author.id})\n**Banlanan Üye:** ${kisi.tag} (${kisi.id})\n**Sebep:** ${reason}`));
    } else {
      message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    };
    return message.reply('Geçerli bir üye ve sebep belirtmelisin!').then(x => x.delete({timeout: 5000}));
  };
  if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(embed.setDescription("Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!user.bannable) return message.channel.send(embed.setDescription("Botun yetkisi belirtilen üyeyi banlamaya yetmiyor!")).then(x => x.delete({timeout: 5000}));
  user.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  user.ban({reason: reason})
  kdb.add(`kullanici.${message.author.id}.ban`, 1);
  kdb.push(`kullanici.${user.id}.sicil`, {
      Yetkili: message.author.id,
      Tip: "BAN",
      Sebep: reason,
      Zaman: Date.now()
    });
  message.channel.send(embed.setImage("https://i.pinimg.com/originals/b2/84/33/b28433c392959f923ff0d736cd89dcbd.gif").setDescription(`\`${user.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **banlandı!**`));
  if(client.channels.cache.has("769585581185171486")) client.channels.cache.get("769585581185171486").send(new MessageEmbed().setTimestamp().setFooter("Gif Heart").setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${message.author} (${message.author.id})\n**Banlanan Üye:** ${user.user.tag} (${user.user.id})\n**Sebep:** ${reason}`));
};
module.exports.config = {
  name: "ban",
  aliases: ["yasakla"],
  usage: "ban [üye] [sebep] / liste / bilgi [id]",
  description: "Belirtilen üyeyi sunucudan yasaklar."
};