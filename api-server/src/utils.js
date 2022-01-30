const validateSchema = require('yaml-schema-validator');
const mime = require('mime-types')

const imageFileExtensions = ['.png', '.jpg', '.jpeg'];
const videoFileExtensions = ['.mp4'];
const arrangementSchema = {
    name: { type: String, required: false },
    items: [{ 
        file: { type: String, required: true },
        duration: { type: Number, require: false },
    }],
};

module.exports = {
    hasValidExtension: (filename) => 
        imageFileExtensions.concat(videoFileExtensions).filter(e => filename.toLowerCase().endsWith(e)).length == 1,
    validateSchema: (arrangement) => validateSchema(arrangement, { schema: arrangementSchema }),
    getMimeType: (filename) => mime.lookup(filename),
}