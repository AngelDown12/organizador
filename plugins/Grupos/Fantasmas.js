let handler = async (m, { conn, text, participants }) => {
let member = participants.map(u => u.id)
if(!text) {
var sum = member.length
} else {
var sum = text} 
var total = 0
var sider = []
for(let i = 0; i < sum; i++) {
let users = m.isGroup ? participants.find(u => u.id == member[i]) : {}
if((typeof global.db.data.users[member[i]] == 'undefined' || global.db.data.users[member[i]].chat == 0) && !users.isAdmin && !users.isSuperAdmin) { 
if (typeof global.db.data.users[member[i]] !== 'undefined'){
if(global.db.data.users[member[i]].whitelist == false){
total++
sider.push(member[i])}
}else {
total++
sider.push(member[i])}}}
if(total == 0) return conn.reply(m.chat, `*[❗𝙸𝙽𝙵𝙾❗]* 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾 𝙽𝙾 𝚃𝙸𝙴𝙽𝙴 𝙵𝙰𝙽𝚃𝙰𝚂𝙼𝙰𝚂, 𝚀𝚄𝙴 𝙱𝚄𝙴𝙽 𝚃𝚁𝙰𝙱𝙰𝙹𝙾 𝙷𝙰𝙲𝙴 𝙴𝙻 𝙰𝙳𝙼𝙸𝙽`, m) 
m.reply(`[ ⚠ 𝙍𝙀𝙑𝙄𝙎𝙄𝙊𝙉 𝙄𝙉𝘼𝘾𝙏𝙄𝙑𝘼  ⚠ ]\n\n𝐆𝐑𝐔𝐏𝐎: ${await conn.getName(m.chat)} & 𝐌𝐈𝐄𝐌𝐁𝐑𝐎𝐒: \n${sum}\n\n[ ⇲ 𝙇𝙄𝙎𝙏𝘼 𝘿𝙀 𝙁𝘼𝙉𝙏𝘼𝙎𝙈𝘼𝙎 ⇱ ]\n${sider.map(v => '  👻 @' + v.replace(/@.+/, '')).join('\n')}\n\n*_ELIMINANDOS COMO NO SE ACTIVEN_*\n𝙽𝙾𝚃𝙰: 𝙴𝚂𝚃𝙾 𝙽𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝟷𝟶𝟶% 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙾, 𝙴𝙻 𝙱𝙾𝚃 𝙸𝙽𝙸𝙲𝙸𝙰 𝙴𝙻 𝙲𝙾𝙽𝚃𝙴𝙾 𝙳𝙴 𝙼𝙴𝙽𝚂𝙰𝙹𝙴𝚂 𝙳𝙴𝚂𝙳𝙴 𝙻𝙰 𝙰𝙲𝚃𝙸𝚅𝙰𝙲𝙸Ó𝙽 𝙴𝙽 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾`, null, { mentions: sider })}
handler.help = ['fantasmas']
handler.tags = ['group']
handler.command = /^(verfantasmas|fantasmas|sider)$/i
handler.admin = true
handler.botAdmin = true
export default handler