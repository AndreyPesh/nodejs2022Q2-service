import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const SALT = process.env.CRYPT_SALT;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(String(password), Number(SALT));
};
