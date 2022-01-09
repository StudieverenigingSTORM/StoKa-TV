.PHONY: error
error:
	@echo "No target specified!"
	@echo "Use \`make debug-containers' to build and run the development environment"
	@echo "Use \`make containers' to build the containers for deployment"
	@exit 1

.PHONY: containers-dev
containers:
	@docker compose build

.PHONY: containers-dev
debug-containers: export API_START_SCRIPT=debug
debug-containers: export DEBUG=express:*
debug-containers: export NODE_ENV=development
debug-containers: export MEDIA_VOL=./media
debug-containers:
	@docker compose up --build --abort-on-container-exit
