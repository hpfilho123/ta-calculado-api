import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { badResquest } from '@/utils/http-helper';

export class signUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return badResquest(new missingParamError('name'));
    }
    if (!httpRequest.body.email) {
      return badResquest(new missingParamError('email'));
    }
  }
}
