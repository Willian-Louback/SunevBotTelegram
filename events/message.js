module.exports = {
    name: "text",
    execute:  async (bot, txt) => {
        const commands = require('../index').commands;
        const prefixo = txt.message.text.slice(0,1);
        if (prefixo !== '/') {
            await txt.reply(`Parece que você está um pouco perdido, tente usar /help !`);
        } else if (prefixo === '/'){
            let commandName;
            for(let i = 1; i <= txt.message.text.length; i++){
                commandName = txt.message.text.substring(1, i);
            }
            const command = commands[commandName];
            try{
                if (command) {
                    command(bot, txt);
                } else {
                    await txt.reply('Comando não encontrado!');
                }
            } catch(error){
                console.error(error);
            }
        } 
    }
}