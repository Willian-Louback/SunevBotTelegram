require('dotenv').config({ path: '../secure/.env'});

module.exports = {
    name: 'help',
    execute: async (bot, txt) => {
        const user = txt.from;
        await txt.reply(
            `Certo, ${user.first_name}. Estou aqui para ajudar!\n`+
            `Lista de comandos:\n`+
            ` • /hello - Use este comando para me testar, eu gosto de falar oi!\n`+
            ` • /userinfo - Use este comando para olhar as suas informações!\n`
        )
    }
}