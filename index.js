const { Bot } = require('grammy');
const fs = require('fs-extra');
const path = require('node:path');

require('dotenv').config({ path: './secure/.env'});

const bot = new Bot(process.env.TOKEN_BOT);

const chalk = require('chalk');
//console.log(`https://api.telegram.org/bot${process.env.TOKEN_BOT}/getMe`);

/*bot.command('start', async(txt) => {
    const user = txt.from;
    if(user.id == process.env.ID_CRIADOR){
        txt.reply(`Olá ${user.first_name}, é sempre um prazer ver você. Meu criador, como posso ajudá-lo?`);
    } else {
        if(user.first_name == "Rian"){
            console.log(user.id);
        }
        txt.reply(`Olá ${user.first_name} ${user.last_name}, como posso ajudá-lo?`);
    }
});*/

//Puxando comandos 
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
    commands[command.name] = command.execute;
    console.log(chalk.blue(`Comando "${command.name}" carregado.`));
}

bot.on('message', (txt) => {
    const prefixo = txt.message.text.slice(0,1);
    if (prefixo !== '/') {
        txt.reply(`Parece que você está um pouco perdido, tente usar /help !`);
    } else if (prefixo === '/'){
        let commandName;
        for(let i = 1; i <= txt.message.text.length; i++){
            commandName = txt.message.text.substring(i, 1);
        }
        const command = commands[commandName];
        if (command) {
            command(bot, txt);
        } else {
            txt.reply('Comando não encontrado!');
        }
    } 
    
});

bot.api.getMe().then((me) => {
    bot.options = {};
    bot.options.first_name = me.first_name;
    console.log(chalk.green(`Olá, eu sou o ${me.first_name} e estou funcionando!`));
    bot.start();
  });