import { EmailValidator } from '@/interfaces/email-validator.interface';
import validator from 'validator';

export class EmailValidatorAdpter implements EmailValidator {
  isvalid(email: string): boolean {
    return validator.isEmail(email);
  }
}
