import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.setting = {
 autoclear: false,
 addReply: true
 }

global.owner = [
['212717457920', 'Nour', true],
['212605784394', 'imillie', false],
['212693227969', '8bal', false]
]

global.info = {
 nomerbot: '212605784394',
 pairingNumber: '212693227969',
 nameown: 'Ibrahim Adams',
 nomerown: '254710772666',
 packname: 'sticker by ',
 author: 'ibrahim adams',
 namebot: '𝐏𝐀𝐍𝐓𝐇𝐄𝐑 𝐌𝐃',
 wm: ''-'_𝐏𝐀𝐍𝐓𝐇𝐄𝐑 𝐌𝐃_'-'',
 stickpack: 'Whatsapp',
 stickauth: '𝐏𝐀𝐍𝐓𝐇𝐄𝐑 𝐌𝐃 '
}

// Thumbnail 
global.url = {
 profil: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 did: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 rules: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 thumbnail: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 thumb: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 logo: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 unReg: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 registrasi: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 confess: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg',
 akses: 'https://telegra.ph/file/29e49761b9b813a814afb.jpg', 
 wel: 'https://telegra.ph/file/9dbc9c39084df8691ebdd.mp4', // gif welcome 
 bye: 'https://telegra.ph/file/1c05b8c019fa525567d01.mp4', // gif good bye
 sound: 'https://media.vocaroo.com/mp3/1awgSZYHXP3B' // untuk menu
}

// Sosmed
global.url = {
 sig: 'https://www.instagram.com/ibrahimtechofficial1',
 sgh:  'https://github.com/ibrahimaitech',
 sgc: 'https://chat.whatsapp.com/F5BXJci8EDS9AJ6sfKMXIS'
}

global.wait =` انتظر .. أنا أحاول تلبية طلبك ...`

// Info Wait
global.msg = {
 wait: '⏱️ *Please be patient*\n\> Running command from *User*!',
 eror: '🤖*Bot Information*\n\> Sorry for the inconvenience in using *Panther md*. There was an error in the system while executing the command.'
}

global.multiplier = 69
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
      let emot = {
      agility: '🤸‍♂️',
      arc: '🏹',
      armor: '🥼',
      bank: '🏦',
      bibitanggur: '🍇',
      bibitapel: '🍎',
      bibitjeruk: '🍊',
      bibitmangga: '🥭',
      bibitpisang: '🍌',
      bow: '🏹',
      bull: '🐃',
      cat: '🐈',
      chicken: '🐓',
      common: '📦',
      cow: '🐄',
      crystal: '🔮',
      darkcrystal: '♠️',
      diamond: '💎',
      dog: '🐕',
      dragon: '🐉',
      elephant: '🐘',
      emerald: '💚',
      exp: '✉️',
      fishingrod: '🎣',
      fox: '🦊',
      gems: '🍀',
      giraffe: '🦒',
      gold: '👑',
      health: '❤️',
      horse: '🐎',
      intelligence: '🧠',
      iron: '⛓️',
      keygold: '🔑',
      keyiron: '🗝️',
      knife: '🔪',
      legendary: '🗃️',
      level: '🧬',
      limit: '🌌',
      lion: '🦁',
      magicwand: '⚕️',
      mana: '🪄',
      money: '💵',
      mythic: '🗳️',
      pet: '🎁',
      petFood: '🍖',
      pickaxe: '⛏️',
      pointxp: '📧',
      potion: '🥤',
      rock: '🪨',
      snake: '🐍',
      stamina: '⚡',
      strength: '🦹‍♀️',
      string: '🕸️',
      superior: '💼',
      sword: '⚔️',
      tiger: '🐅',
      trash: '🗑',
      uncommon: '🎁',
      upgrader: '🧰',
      wood: '🪵'
    }
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
}

// Apikey
global.api = {
 lol: 'GataDios'

}
global.APIs = {
  lol: "https://api.lolhumaan.xyz"
}

//Apikey
global.APIKeys = {
    "https://api.lolhumaan.xyz": "GataDios"
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'settings.js'"))
  import(`${file}?update=${Date.now()}`)
})
