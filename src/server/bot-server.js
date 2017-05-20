const bodyParser = require('body-parser');
const express = require('express');

class BotServer {

  constructor(bot, port) {
    const app = express();

    // parse the updates to JSON
    app.use(bodyParser.json());

    // We are receiving updates at the route below!
    app.post(`/${bot.token}`, (req, res) => {
      if (BotServer.isTelegramMessage(req.body)) {
        bot.processUpdate(req.body);
      }

      res.sendStatus(200).end();
    });

    // Start Express Server
    app.listen(port, () => {});
  }

  // reference: https://core.telegram.org/bots/api#update

  static isTelegramMessage(msg) {
    return msg.message
      || msg.edited_message
      || msg.channel_post
      || msg.edited_channel_post
      || msg.inline_query
      || msg.chosen_inline_result
      || msg.callback_query;
  }

}

module.exports = BotServer;
