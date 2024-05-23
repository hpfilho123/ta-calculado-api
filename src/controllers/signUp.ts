import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { badResquest } from '@/utils/http-helper';

export class signUpController {
  handle(httpRequest: httpRequest): httpResponse {
    let teste: string;
    const requireFilds = ['name', 'email', 'password', 'passwordConfim'];

    for (const field of requireFilds) {
      if (!httpRequest.body[field]) {
        return badResquest(new missingParamError(field));
      }
    }
  }
}
