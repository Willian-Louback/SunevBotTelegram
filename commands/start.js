require('dotenv').config({ path: './secure/.env'});

module.exports = {
    name: 'start',
    execute: async (bot, txt) => {
        const user = txt.from;
        if(user.id == process.env.ID_CRIADOR){
            await txt.reply(`Olá ${user.first_name}, é sempre um prazer ver você. Meu criador, como posso ajudá-lo?`);
        } else {
            if(user.first_name == "Rian"){
                console.log(user.id);
            }
            await txt.reply(`Olá ${user.first_name} ${user.last_name}, como posso ajudá-lo?`);
        }
    }
}