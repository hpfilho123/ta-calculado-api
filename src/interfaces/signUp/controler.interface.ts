import { httpRequest, httpResponse } from '@/interfaces/signUp/https.interface';

export interface controller {
  handle(httpRequest: httpRequest): httpResponse;
}
