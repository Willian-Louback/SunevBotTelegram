module.exports = {
    name: "userinfo",
    execute: async (bot, txt) => {
        const user = txt.from;
        await txt.reply(`Nome: ${user.first_name}.\n`+
        `Sobrenome: ${user.last_name ? user.last_name : `O usuário não adicionou um sobrenome`}.\n`+
        `Username: ${user.username ? user.username : `O usuário não possui um username`}.\n`+
        `ID: ${user.id}.`)
    }
}