import multer from 'multer';

const imageUrl = './src/upload/images'
import path from 'path';
const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
    callback(null, imageUrl) },
    filename: (req, file, cb ) =>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
	storage: storage
});

export default upload;