require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('❌ BOT_TOKEN was not found в .env');
  process.exit(1);
}

// Инициализация бота
const bot = new TelegramBot(token, { polling: true });

console.log('✅ Telegram-bot has started...');

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Добро пожаловать, ${msg.from.first_name}! Этот бот работает на Linux-сервере.`);
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const helpText = `Доступные команды:
/start - Начать работу
/help - Помощь
/ping - Проверка связи`;
  bot.sendMessage(msg.chat.id, helpText);
});

// Обработка команды /ping
bot.onText(/\/ping/, (msg) => {
  bot.sendMessage(msg.chat.id, 'pong');
});

// Обработка всех прочих сообщений
bot.on('message', (msg) => {
  if (!msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, '⚠️ Неизвестная команда. Введите /help для списка команд.');
  }
});
