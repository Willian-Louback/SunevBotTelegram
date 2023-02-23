module.exports = {
    name: "hello",
    execute: async (bot, txt) => {
        await txt.reply("Olá mundo!");
    }
}