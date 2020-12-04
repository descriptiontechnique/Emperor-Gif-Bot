const app = require("express")();
const http = require("http");


const Discord = require("discord.js")
const client = new Discord.Client();
const config = require("./config.js")
const fs = require("fs")
const ms = require("moment")
const db = require("quick.db")
const moment = require("moment-duration-format")
const humanizeDuration = require("humanize-duration") 

require('./util/Loader.js')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
})

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.login(config.token)

global.ayar = client.ayar = {
  "botSahip": "715967448662147103"
};
const ayar = global.ayar;
var prefix = config.prefix

client.on("message", async message => {
  if(!message.content.toLowerCase().startsWith(prefix)) return;
  if(message.author.bot) return;
  
  let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length);
  var args = message.content.split(' ').slice(1);
  
  if(command === "eval") {
    if(message.author.id !== ayar.botSahip) return;
    if(message.author.id !== ayar.botSahip) return;
    if(message.author.id !== ayar.botSahip) return;
    if(message.author.id !== ayar.botSahip) return;
    if(message.author.id !== ayar.botSahip) return;
    if (!args[0] || args[0].includes('token')) return message.channel.send("Kod belirtilmedi `" + prefix + "eval`__`<kod>`__");
  
	  const code = args.join(' ');
	  function clean(text) {
		  if (typeof text !== 'string')
		  text = require('util').inspect(text, { depth: 0 })
		  text = text
			.replace(/`/g, '`' + String.fromCharCode(8203))
			.replace(/@/g, '@' + String.fromCharCode(8203))
		  return text;
	  };
	  async function send(embed) {
		  message.channel.send(embed);
	  }
    try {
		  var evaled = clean(await eval(code));
      if(evaled.match(new RegExp(`${client.token}`, 'g'))) evaled.replace("token", "Yasaklı komut").replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut");
		  message.channel.send(`${evaled.replace(client.token, "Yasaklı komut").replace(process.env.PROJECT_INVITE_TOKEN, "Yasaklı komut")}`, {code: "js", split: true});
    } catch(err) { message.channel.send(err, {code: "js", split: true}) };
    return;
  };
  
});
 

client.on("message", async(message) =>{
  let dosya = message.attachments.size
  if(message.author.bot) return;
  if(!dosya) return;

  
message.attachments.forEach(resim => {
  if(!resim) return
  console.log(resim)
  if(resim.attachment.endsWith(".png")){
    db.add(`kullanici.${message.author.id}.resimSayisi`, 1);
    db.add(`kullanici.${message.author.id}.toplamSayi`, 1);
  }else if(resim.attachment.endsWith(".gif")){
    db.add(`kullanici.${message.author.id}.gifSayisi`, 1);
    db.add(`kullanici.${message.author.id}.toplamSayi`, 1);
  }else if(resim.attachment.endsWith(".jpg")){
    db.add(`kullanici.${message.author.id}.resimSayisi`, 1);
    db.add(`kullanici.${message.author.id}.toplamSayi`, 1);
  }
})

client.channels.cache.get("769583767614259220").send(new Discord.MessageEmbed().setTitle("GIF/PP Bilgilendirme").setDescription(`${message.author} isimli üye ${message.channel} kanalına **Gif/PP Attı**\n\n\`\`\`Toplam Gif:${db.get(`kullanici.${message.author.id}.gifSayisi`) ? db.get(`kullanici.${message.author.id}.gifSayisi`) :"0"} \n\nToplam Resim:${db.get(`kullanici.${message.author.id}.resimSayisi`) ? db.get(`kullanici.${message.author.id}.resimSayisi`) : "0"} \n\nToplam Gif/Resim:${db.get(`kullanici.${message.author.id}.toplamSayi`) ? db.get(`kullanici.${message.author.id}.toplamSayi`) : "0"}\`\`\``))

})




/*
client.on("message", async(message) =>{
  let dosya = message.attachments.size
  if(message.author.bot) return;
  if(!dosya) return;

  
message.attachments.forEach(resim => {
  if(!resim) return
  console.log(resim)
  if(resim.attachment.endsWith(".png")){
    db.add(`kullanici.${message.author.id}.resimSayisi`, 1);
  }else if(resim.attachment.endsWith(".gif")){
    db.add(`kullanici.${message.author.id}.gifSayisi`, 1);
  }else if(resim.attachment.endsWith(".jpg")){
    db.add(`kullanici.${message.author.id}.resimSayisi`, 1);
  }
})
})*/

client.splitEmbedWithDesc = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new Discord.MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};
