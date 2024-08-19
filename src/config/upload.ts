import multer from 'multer';
import path from 'path';

// Configuración de almacenamiento para multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardan los archivos
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`); // Nombre del archivo
    }
});

const upload = multer({ storage });

export { upload };