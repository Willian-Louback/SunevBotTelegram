const { Telegraf } = require('telegraf');
const fs = require('node:fs');
const path = require('node:path');

require('dotenv').config({ path: './secure/.env'});

const bot = new Telegraf(process.env.TOKEN_BOT);

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
bot.telegram.getMe().then((botInfo) =>{
    console.log(chalk.green(`Olá, eu sou o ${botInfo.first_name} e estou funcionando!`));
    bot.launch();
}) .catch(console.error);