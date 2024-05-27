import {
  httpResponse,
  httpRequest,
} from '../interfaces/signUp/https.interface';
import { missingParamError, invalidParamError } from '@/exceptions/index';
import { badResquest, serverError } from '@/utils/http-helper';
import { controller } from '@/interfaces/signUp/controler.interface';
import { EmailValidator } from '@/interfaces/email-validator.interface';
import { AddAccount } from '@/interfaces/business/add-account';

export class signUpController implements controller {
  private readonly emailValidator: EmailValidator;
  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requireFilds = ['name', 'email', 'password', 'passwordConfim'];
      for (const field of requireFilds) {
        if (!httpRequest.body[field]) {
          return badResquest(new missingParamError(field));
        }
      }
      const { name, email, password, passwordConfim } = httpRequest.body;
      if (password != passwordConfim) {
        return badResquest(new invalidParamError('passwordConfim'));
      }
      const isValid = this.emailValidator.isvalid(email);
      console.log(isValid);
      if (!isValid) {
        return badResquest(new invalidParamError('email'));
      }
      this.addAccount.add({
        name,
        email,
        password,
      });
    } catch (error) {
      return serverError();
    }
  }
}
