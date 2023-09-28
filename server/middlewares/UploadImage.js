import multer from 'multer';
import path from 'path';




const store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})


const uploadImage = multer({
    storage: store,
})


export default uploadImage