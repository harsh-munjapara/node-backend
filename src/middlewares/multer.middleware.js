import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './public/temp';
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

export const upload = multer({ storage: storage });