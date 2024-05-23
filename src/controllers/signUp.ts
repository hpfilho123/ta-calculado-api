import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';

export class signUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new missingParamError('name'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new missingParamError('email'),
      };
    }
  }
}
