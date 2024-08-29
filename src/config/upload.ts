import multer from 'multer';
import path from 'path';
import fs from 'fs'

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

// Método para eliminar la imagen
const unlinkFile = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err){
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export { upload, unlinkFile };