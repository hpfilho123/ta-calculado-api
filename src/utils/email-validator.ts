import { EmailValidator } from '@/interfaces/email-validator.interface';

export class EmailValidatorAdpter implements EmailValidator {
  isvalid(email: string): boolean {
    return false;
  }
}
