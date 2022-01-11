.PHONY: bot clean migrate-users

bot:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,/etc/alpine-release \
		--allow-env \
		--allow-net \
		--unstable \
		src/bot.ts

server:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-write=src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-env \
		--allow-net \
		--watch \
		src/server.ts

migrate-users: src/database/db.sqlite src/database/db.sqlite-journal
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-write=src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-env \
		src/database/migrations/users.ts
	@echo "User Migration Done!"

migrate-questions: src/database/db.sqlite src/database/db.sqlite-journal
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-write=src/database/db.sqlite,src/database/db.sqlite-journal \
		--allow-env \
		src/database/migrations/questions.ts
	@echo "Question Migration Done!"

src/database/db.sqlite:
	touch src/database/db.sqlite

src/database/db.sqlite-journal:
	touch src/database/db.sqlite-journal
