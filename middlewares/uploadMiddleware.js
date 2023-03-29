const multer = require("multer")

const multerConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "tmp")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({
    storage: multerConfig,
})

module.exports = {
    upload
}