import { EmailValidatorAdpter } from '@/utils/email-validator';

describe('email validator Adapter', () => {
  test('deve retornar false se o validador retornar false ', () => {
    const sut = new EmailValidatorAdpter();
    const isValid = sut.isvalid('invalidEmail');
    expect(isValid).toBe(false);
  });
});
