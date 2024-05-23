import { httpResponse } from '@/interfaces/signUp/https.interface';
export const badResquest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});
