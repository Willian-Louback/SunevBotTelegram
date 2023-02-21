module.exports = {
    name: "message",
    execute:  (bot, txt) => {
        const commands = require('../index').commands;
        const prefixo = txt.message.text.slice(0,1);
        if (prefixo !== '/') {
            txt.reply(`Parece que você está um pouco perdido, tente usar /help !`);
        } else if (prefixo === '/'){
            let commandName;
            for(let i = 1; i <= txt.message.text.length; i++){
                commandName = txt.message.text.substring(1, i+1);
            }
            const command = commands[commandName];
            if (command) {
                command(bot, txt);
            } else {
                txt.reply('Comando não encontrado!');
            }
        } 
    }
}