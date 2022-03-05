.PHONY: error
error:
	@echo "No target specified!"
	@echo "Use \`make debug-containers' to build and run the development environment"
	@echo "Use \`make containers' to build the containers for deployment"
	@exit 1

.PHONY: containers
containers:
	@bash frontend/download-dependencies.sh
	@docker-compose build

.PHONY: debug-containers
debug-containers: export BACKEND_DEBUG=express:*
debug-containers: export BACKEND_START_SCRIPT=debug
debug-containers: export NODE_ENV=development
debug-containers: export MEDIA_VOL=./media
debug-containers:containers
	@docker-compose up --abort-on-container-exit

.PHONY: app
app:
	@bash app/build.sh
