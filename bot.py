import os
from twitchio.enums import WebhookMode
from twitchio.ext import commands
from twitchio.webhook import UserFollows

class CNullBot(commands.Bot):
    def __init__(self):
        super().__init__(
            irc_token=os.environ['TMI_TOKEN'],
            client_id=os.environ['CLIENT_ID'],
            nick=os.environ['BOT_NICK'],
            prefix=os.environ['BOT_PREFIX'],
            initial_channels=[os.environ['CHANNEL']],
            webhook_server=True,
            local_host='localhost',
            port=8080
        )

    async def event_ready(self):
        print(f"{self.nick} is alive!")

        // TODO
        await self.modify_webhook_subscription(
            callback='localhost',
            mode=WebhookMode.subscribe,
            topic=UserFollows(first=1, to_id=53017100),
            lease_seconds=0,
            secret=os.environ['SECRET_ID']
        )

    async def event_webhook(self, data):
        print(data)

    @commands.command(name="test")
    async def test_cmd(self, ctx):
        await ctx.send(f"/me This is a test")


if __name__ == "__main__":
    CNullBot().run()
