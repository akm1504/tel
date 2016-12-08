const lib         = require('../lib/functions');
const TelegramBot = require('node-telegram-bot-api');

module.exports = (req, res) => {
    let {
        token,
        chatId,
        video,
        duration,
        width,
        height,
        caption,
        disableNotification,
        replyToMessageId,
        replyMarkup
    } = req.body.args;

    let required = lib.parseReq({token, chatId, video});

    if(required.length > 0) 
        throw new RapidError('REQUIRED_FIELDS', required)

    if(replyMarkup && typeof replyMarkup == 'string') {
        try {
            replyMarkup = JSON.parse(replyMarkup);
        } catch(e) {
            throw new RapidError('JSON_VALIDATION');
        }   
    }

    let bot     = new TelegramBot(token);
    let options = lib.clearArgs({
        duration:             duration,
        width:                width,
        height:               height,
        caption:              caption,
        disable_notification: disableNotification,
        reply_to_message_id:  replyToMessageId,
        reply_markup:         replyMarkup
    })

    return bot.sendVideo(chatId, video, options);
}