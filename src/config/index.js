const { config: dotenvConfig } = require('dotenv');
const storage = require('node-persist');
const { dbSetup } = require('../storage');

dotenvConfig();
dbSetup();

const accessToken = storage.getItem('accessToken');
const refreshToken = storage.getItem('refreshToken');

module.exports = {
  authApi: 'https://id.twitch.tv',
  api: 'https://api.twitch.tv/helix',
  scopes: [
    'analytics:read:extensions',
    'analytics:read:games',
    'bits:read',
    'channel:edit:commercial',
    'channel:manage:broadcast',
    'channel:manage:extensions',
    'channel:manage:redemptions',
    'channel:manage:videos',
    'channel:read:editors',
    'channel:read:hype_train',
    'channel:read:redemptions',
    'channel:read:stream_key',
    'channel:read:subscriptions',
    'clips:edit',
    'moderation:read',
    'user:edit',
    'user:edit:follows',
    'user:read:blocked_users',
    'user:manage:blocked_users',
    'user:read:broadcast',
    'user:read:email',
    'channel:moderate',
    'chat:edit',
    'chat:read',
    'whispers:read',
    'whispers:edit',
  ],
  oauthChatToken: process.env.OAUTH_CHAT_TOKEN,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  userID: process.env.USER_ID,
  botUserID: process.env.BOT_USER_ID,
  botNickname: process.env.BOT_NICK,
  botPrefix: process.env.BOT_PREFIX,
  ircChannel: process.env.IRC_CHANNEL,
  accessToken: accessToken !== null ? accessToken : '',
  refreshToken: refreshToken !== null ? refreshToken : '',
};
