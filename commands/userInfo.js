module.exports = {
    name: "userinfo",
    execute: async (bot, txt) => {
        const user = txt.from;
        await txt.reply(`Nome: ${user.first_name}.\n`+
        `Sobrenome: ${user.last_name}.\n`+
        `Username: ${user.username}.\n`+
        `ID: ${user.id}.`)
    }
}