.PHONY: bot clean clean-db migrate-users

bot:
	deno run \
		--allow-read=.env,.env.example,.env.defaults,/etc/alpine-release,src/server/database/db.sqlite,src/server/database/db.sqlite-journal \
		--allow-write=src/server/database/db.sqlite,src/server/database/db.sqlite-journal,src/utils/logs \
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

update-shared:
	cp -rfv ./src/server/shared ../frontend/src

migrate-users: src/server/database/db.sqlite src/server/database/db.sqlite-journal
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
	touch src/server/database/db.sqlite-journal

clean-db:
	rm src/server/database/db.sqlite
	@echo "Database cleaned!"
