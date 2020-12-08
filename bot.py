import os
from twitchio.ext import commands

bot = commands.Bot(
    irc_token=os.environ['TMI_TOKEN'],
    api_token=os.environ['OAUTH_TOKEN'],
    client_id=os.environ['CLIENT_ID'],
    nick=os.environ['BOT_NICK'],
    prefix=os.environ['BOT_PREFIX'],
    initial_channels=['#creativenull'],
)

@bot.event
async def event_ready():
    print(f"{bot.nick} is live")

@bot.command(name='hello', aliases=['hey', 'hi'])
async def hello(c):
    message = f"/me no u"
    await c.send(message)

if __name__ == "__main__":
    bot.run()
