import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { badResquest } from '@/utils/http-helper';
import { controller } from '@/interfaces/signUp/controler.interface';

export class signUpController implements controller {
  handle(httpRequest: httpRequest): httpResponse {
    const requireFilds = ['name', 'email', 'password', 'passwordConfim'];

    for (const field of requireFilds) {
      if (!httpRequest.body[field]) {
        return badResquest(new missingParamError(field));
      }
    }
  }
}
