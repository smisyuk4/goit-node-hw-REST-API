const multer = require("multer")
const path = require("path")

const tempDir = path.join(__dirname, "../", "temp")

const multerConfig = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, tempDir)
    },
    fileName: (req, file, cb) => {
        cb(null, file.originalname)
    },
    limits: {
        fileSize: 2040
    }
})

const upload = multer({
    storage: multerConfig,
})

module.exports = {
    upload
}