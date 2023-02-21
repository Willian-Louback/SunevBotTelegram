const { Bot } = require('grammy');
const fs = require('fs-extra');
const path = require('path-browserify');

require('dotenv').config({ path: './secure/.env'});

const bot = new Bot(process.env.TOKEN_BOT);

const chalk = require('chalk');

//Buscar comandos 
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
    commands[command.name] = command.execute;
    module.exports.commands = commands;
    console.log(chalk.blue(`Comando "${command.name}" carregado.`));
}

//Buscar Eventos 
const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

const events = [];

for(const file of eventsFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    events[event.name] = event.execute;
    
    bot.on(event.name, (...txt) => event.execute(bot, ...txt));
    console.log(chalk.cyan(`Evento "${event.name}" carregado.`));
}

//Iniciar Bot
bot.api.getMe().then((me) => {
    bot.options = {};
    bot.options.first_name = me.first_name;
    console.log(chalk.green(`Olá, eu sou o ${me.first_name} e estou funcionando!`));
    bot.start();
});