import { EmailValidatorAdpter } from '@/utils/email-validator-adapter';

describe('email validator Adapter', () => {
  test('deve retornar false se o validador retornar false ', () => {
    const sut = new EmailValidatorAdpter();
    const isValid = sut.isvalid('invalidEmail');
    expect(isValid).toBe(false);
  });
});

describe('email validator Adapter', () => {
  test('deve retornar true se o validador retornar true ', () => {
    const sut = new EmailValidatorAdpter();
    const isValid = sut.isvalid('hpsantos@bernhoeft.com.br');
    expect(isValid).toBe(true);
  });
});
