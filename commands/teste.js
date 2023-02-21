require('dotenv').config({ path: './secure/.env'});

module.exports = {
    name: 'help',
    execute: (bot, txt) => {
        const user = txt.from;
        txt.reply(
            `Certo, ${user.first_name}. Estou aqui para ajudar!\n`+
            `Lista de comandos:\n`+
            ` /help - Use este comando para obter ajuda, não exite em perguntar!\n`+
            ` /start - Use este comando para começarmos!\n`
        )
    }
}