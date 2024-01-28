const TelegramBot = require('node-telegram-bot-api');

const targetChatId = '-4123679157';
const token = '6958302631:AAGWA-ExImPEuo0yB4VIoaAO98IEQRchtmM';

// 建立機器人
const bot = new TelegramBot(token, { polling: true });

// 監聽/start命令
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '您好！我是轉傳機器人。');
});

// 監聽收到的訊息並轉傳
bot.on('message', (msg) => {
  if (msg.text && msg.text.toLowerCase() !== '/start') {
    bot.forwardMessage(targetChatId, msg.chat.id, msg.message_id);
  }
});

// 監聽照片和影片訊息並轉傳
bot.on('photo', (msg) => {
  if (msg.photo) {
    const photoId = msg.photo[msg.photo.length - 1].file_id;
    bot.sendPhoto(targetChatId, photoId);
  }
});

bot.on('video', (msg) => {
  if (msg.video) {
    const videoId = msg.video.file_id;
    bot.sendVideo(targetChatId, videoId);
  }
});
