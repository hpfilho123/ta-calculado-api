import { httpResponse } from '@/interfaces/signUp/https.interface';
import { ServerError } from '@/exceptions/serverError';

export const badResquest = (error: Error): httpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): httpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
