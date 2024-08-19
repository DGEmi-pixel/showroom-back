import mongoose from 'mongoose';
import {dbConfig} from '../config/config';

const connectDb = async () => {
	try {
		// Uri para conectarse a la base de datos
        //mongodb+srv://dgemiliano:WNYPQaNKaaKcCHHT@cluster0.t4sbkv9.mongodb.net/
		const dbUri = `mongodb+srv://${dbConfig.dbUser}:${dbConfig.dbPwd}@cluster0.t4sbkv9.mongodb.net/${dbConfig.dbName}`;

		// Conexión a la base de datos
		await mongoose.connect(dbUri);

		console.log('Conectado a la base de datos');
	} catch (error) {
		console.error('Error al conectar a la base de datos: ', error);
		throw error;
	}
};

export default connectDb;
