import { hash, compare } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
}

export const comparePassword = async (password: string, storePasswordHash: string): Promise<boolean> => {
  return await compare(password, storePasswordHash);
}
