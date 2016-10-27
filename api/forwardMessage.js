const Q        = require('q');
const lib      = require('../lib/functions');
const request  = require('request');

module.exports = (req, res) => {
    const defered = Q.defer();

    let {
        token,
        chatId,
        fromChatId,
        disableNotification,
        messageId
    } = req.body.args;

    if(!token || !chatId || !fromChatId || !messageId) 
        throw new Error('Required fields: token, chatId, fromChatId, messageId');

    let uri  = `https://api.telegram.org/bot${token}/forwardMessage?chat_id=${chatId}&from_chat_id=${fromChatId}&message_id=${messageId}`;
    if(disableNotification) 
        uri += `&disable_notification=${disableNotification}`;

    request(uri, (err, response, reslut) => {
        if(!err && response.statusCode == 200) 
            defered.resolve(JSON.parse(reslut));
        else 
            defered.reject(err || JSON.parse(reslut));
    });

    return defered.promise;
}