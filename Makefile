.PHONY: bot

bot:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,/etc/alpine-release \
		--allow-env \
		--allow-net \
		--unstable \
		src/bot/index.ts
