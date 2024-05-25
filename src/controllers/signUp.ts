import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { badResquest } from '@/utils/http-helper';
import { controller } from '@/interfaces/signUp/controler.interface';
import { EmailValidator } from '@/interfaces/email-validator.interface';
import { invalidParamError } from '@/exceptions/signUp/invalid-param-error';

export class signUpController implements controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: httpRequest): httpResponse {
    const requireFilds = ['name', 'email', 'password', 'passwordConfim'];

    for (const field of requireFilds) {
      if (!httpRequest.body[field]) {
        return badResquest(new missingParamError(field));
      }
    }
    const isValid = this.emailValidator.isvalid(httpRequest.body.email);
    if (!isValid) {
      return badResquest(new invalidParamError('email'));
    }
  }
}
