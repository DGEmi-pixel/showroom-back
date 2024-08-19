import bcrypt from 'bcrypt';

const saltRounds = 10;

//[ ] ENCRYPT
export const hashPassword = async (password: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, (err, salt) => {
			if (err) {
				reject(err);
			} else {
				bcrypt.hash(password, salt, (error, hash) => {
					if (error) {
						reject(error);
					} else {
						resolve(hash);
					}
				});
			}
		});
	});
};

//[ ] DECRYPT
export const comparePassword = async (userInputPasswod: string, storedHashedPassword: string): Promise<boolean> => {
	try {
		const result = await bcrypt.compare(
			userInputPasswod,
			storedHashedPassword
		)
		return result
	} catch (error) {
		return false
	}
}