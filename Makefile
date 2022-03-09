.PHONY: error
error:
	@echo "No target specified!"
	@echo "Use 'make images' to build the container images for deployment"
	@echo "Use 'make debug-containers' to build and run the development environment"
	@echo "Use 'make clean-images' to delete the container images"
	@echo "Use 'make app' to build the Tizen application"
	@echo "Use 'make install-app TARGET=\"<IP address of TV>\"' to install the Tizen application"
	@echo "Use 'make clean-app' to delete all packaged Tizen applications"
	@echo "Use 'example-media' to generate test images"
	@exit 1

.PHONY: images
images:
	@bash frontend/download-dependencies.sh
	@docker-compose build

.PHONY: debug-containers
debug-containers: export BACKEND_DEBUG=express:*
debug-containers: export BACKEND_START_SCRIPT=debug
debug-containers: export NODE_ENV=development
debug-containers: export MEDIA_VOL=./media
debug-containers:images
	@docker-compose up --abort-on-container-exit

.PHONY: clean-images
clean-images:
	@docker images | grep -o "stoka-tv[^ ]*" | xargs docker image rm

app/StoKa-TV.wgt:
	@bash app/build.sh

.PHONY: app
app: app/StoKa-TV.wgt

.PHONY: app
install-app: app/StoKa-TV.wgt
	@bash app/install.sh $(TARGET)

.PHONY: clean-app
clean-app:
	@ls app/ | grep "^.*\.wgt" | sed 's/^/app\//g' | xargs rm -f

.PHONY: clean
clean: clean-app clean-images

.PHONY: example-media
example-media:
	@bash generate_example_media.sh
