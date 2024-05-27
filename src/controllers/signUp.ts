import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { badResquest } from '@/utils/http-helper';
import { controller } from '@/interfaces/signUp/controler.interface';
import { EmailValidator } from '@/interfaces/email-validator.interface';
import { invalidParamError } from '@/exceptions/signUp/invalid-param-error';
import { serverError } from '@/exceptions/serverError';

export class signUpController implements controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requireFilds = ['name', 'email', 'password', 'passwordConfim'];

      for (const field of requireFilds) {
        if (!httpRequest.body[field]) {
          return badResquest(new missingParamError(field));
        }
      }
      const isValid = this.emailValidator.isvalid(httpRequest.body.email);
      console.log(isValid);
      if (!isValid) {
        return badResquest(new invalidParamError('email'));
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: new serverError(),
      };
    }
  }
}
