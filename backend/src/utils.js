const validateSchema = require('yaml-schema-validator');
const mime = require('mime-types')

const imageFileExtensions = ['.png', '.jpg', '.jpeg'];
const videoFileExtensions = ['.mp4'];
const arrangementSchema = {
    title: { type: String, required: false },
    items: [{
        file: { type: String, required: true },
        duration: { type: Number, require: false },
    }],
};

const isImageFile = (filename) => imageFileExtensions.filter(e => filename.toLowerCase().endsWith(e)).length == 1;
const isVideoFile = (filename) => videoFileExtensions.filter(e => filename.toLowerCase().endsWith(e)).length == 1;

module.exports = {
    hasValidExtension: (filename) =>
        isImageFile(filename) || isVideoFile(filename),
    isImageFile: isImageFile,
    isVideoFile: isVideoFile,
    validateSchema: (arrangement) => validateSchema(arrangement, { schema: arrangementSchema }),
    getMimeType: (filename) => mime.lookup(filename),
    getRangeFromRequest: (req, fileSize) => {
        const range = req.headers.range;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            return { start: start, end: end };
        }
        else {
            return null;
        }
    },
    // Mittigate path traversal attacks
    sanatizeFilenameInput: (filename) => filename.replace(/[/\\]/g, ''),
}