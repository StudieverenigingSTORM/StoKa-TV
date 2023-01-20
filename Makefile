.PHONY: error
error:
	@echo "No target specified!"
	@echo "Use 'make images' to build the container images for deployment"
	@echo "Use 'make debug-containers' to build and run the development environment"
	@echo "Use 'make clean-images' to delete the container images"
	@echo "Use 'make tizen-app' to build the Tizen application"
	@echo "Use 'make install-tizen-app TARGET=\"<IP address of TV>\"' to install the Tizen application"
	@echo "Use 'make clean-tizen-app' to delete all packaged Tizen applications"
	@echo "Use 'make android-app' to build the Android application"
	@echo "Use 'make clean-android-app' to delete all packaged Android applications"
	@echo "Use 'example-media' to generate test images"
	@exit 1

.PHONY: images
images:
	@bash frontend/download-dependencies.sh
	@docker compose build

.PHONY: debug-containers
debug-containers: export BACKEND_DEBUG=express:*
debug-containers: export BACKEND_START_SCRIPT=debug
debug-containers: export NODE_ENV=development
debug-containers: export MEDIA_VOL=./media
debug-containers:images
	@docker compose up --abort-on-container-exit

.PHONY: clean-images
clean-images:
	@docker images | grep -o "stoka-tv[^ ]*" | xargs docker image rm

app/tizen/StoKa-TV.wgt:
	@bash app/tizen/build.sh

.PHONY: tizen-app
tizen-app: app/tizen/StoKa-TV.wgt

.PHONY: install-tizen-app
install-tizen-app: app/tizen/StoKa-TV.wgt
	@bash app/tizen/install.sh $(TARGET)

.PHONY: clean-tizen-app
clean-tizen-app:
	@ls app/tizen | grep "^.*\.wgt" | sed 's/^/app\/tizen\//g' | xargs rm -f

.PHONY: android-app
android-app:
	@bash -c "cd app/android/ && bash gradlew assembleDebug"

.PHONY: clean-android-app
clean-android-app:
	@bash -c "cd app/android/ && bash gradlew clean"

.PHONY: clean
clean: clean-tizen-app clean-android-app clean-images

.PHONY: example-media
example-media:
	@bash generate_example_media.sh
