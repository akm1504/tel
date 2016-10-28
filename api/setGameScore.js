const lib         = require('../lib/functions');
const TelegramBot = require('node-telegram-bot-api');

module.exports = (req, res) => {
    let {
        token,
        chatId,
        userId,
        score,
        messageId,
        inlineMessageId,
        editMessage
    } = req.body.args;

    if(!token) throw new Error('Required fields: token');

    let bot     = new TelegramBot(token);
    let options = lib.clearArgs({
        chat_id:           chatId,
        user_id:           userId,
        message_id:        messageId,
        inline_message_id: inlineMessageId,
        edit_message:      editMessage
    })

    return bot.setGameScore(chatId, score, options);
}