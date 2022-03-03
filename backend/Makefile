.PHONY: bot clean migrate-users

bot:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,/etc/alpine-release \
		--allow-env \
		--allow-net \
		src/bot/index.ts

server:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/server/database/db.sqlite,src/server/database/db.sqlite-journal,src/utils/logs \
		--allow-write=src/server/database/db.sqlite,src/server/database/db.sqlite-journal,src/utils/logs \
		--allow-env \
		--allow-net \
		--watch \
		src/server/index.ts

migrate-users: src/database/db.sqlite src/database/db.sqlite-journal
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-write=src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-env \
		src/server/database/migrations/users.ts
	@echo "User Migration Done!"

migrate-questions: src/server/database/db.sqlite src/server/database/db.sqlite-journal
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-write=src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-env \
		src/server/database/migrations/questions.ts
	@echo "Question Migration Done!"

migrate-commands: src/server/database/db.sqlite src/server/database/db.sqlite-journal
	deno run \
		--allow-read=.env,.env.example,.env.defaults,src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-write=src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-env \
		src/server/database/migrations/commands.ts
	@echo "Commands Migration Done!"

src/server/database/db.sqlite:
	touch src/server/database/db.sqlite

src/server/database/db.sqlite-journal:
	touch src/database/db.sqlite-journal
