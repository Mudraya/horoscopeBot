const http = require('http');
const request = require('request')
const token = '755380132:AAH326o9uguBRBOC9qpGX_n5TvQug85W8Ys'
const webHookUrl = 'https://horoscopebot.mudrayaod.now.sh'

const options = {
        port: 443,
        key: 'D:/FILES/J2019/node/telebot/key.pem',
        cert: 'D:/FILES/J2019/node/telebot/server.crt',
};

const sendMessage = (chat_id, text, res) => {
    const sendMessageUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    request.post({
            url: sendMessageUrl,
            method: 'post',
            body: {
                chat_id: chat_id,
                text: text
            },
            json: true
        },
        (error, response, body) => {
            console.log(error);
            console.log(body);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end()
        }
    )
};

http.createServer(options, function (req, res) {
    let data = '';

    req.on('data', chunk => {
        data += chunk;
    });

    req.on('end', () => {
        const parsedUpdate = data != "" ? JSON.parse(data) : {};
        if (typeof parsedUpdate.message !== 'undefined') {
            const text = parsedUpdate.message.text;
            const chat_id = parsedUpdate.message.chat.id;
            sendMessage(chat_id, text, res);
        }
    });
}).listen(3000);

const setWebHook = () => {
    const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook`;

    request.post({
            url: setWebhookUrl,
            method: 'post',
            body: {
                url: webHookUrl
            },
            json: true
        },
        (error, response, body) => {
            console.log(body);
        })
};

setWebHook()
