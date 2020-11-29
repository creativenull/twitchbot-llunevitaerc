import os
from twitchio.ext import commands

# bot = commands.Bot(
#     irc_token=os.environ['TMI_TOKEN'],
#     client_id=os.environ['CLIENT_ID'],
#     nick=os.environ['BOT_NICK'],
#     prefix=os.environ['BOT_PREFIX'],
# )
#
# @bot.event
# async def event_ready():
#     print(f"{os.environ['BOT_NICK']}, is online!")
#     ws = bot._ws
#     await ws.send_privmsg('creativenull', f"/me I am online")


class CNullBot(commands.Bot):

    def __init__(self):
        super().__init__(
            irc_token=os.environ['TMI_TOKEN'],
            client_id=os.environ['CLIENT_ID'],
            nick=os.environ['BOT_NICK'],
            prefix=os.environ['BOT_PREFIX'],
            initial_channels=[os.environ['CHANNEL']]
        )

    async def event_ready(self):
        print(f"{self.nick} is alive!")

    @commands.command(name="test")
    async def test_cmd(self, ctx):
        await ctx.send(f"/me This is a test")


if __name__ == "__main__":
    CNullBot().run()
