import { invalidParamError } from '@/exceptions/signUp/invalid-param-error';
import { signUpController } from '../controllers/signUp';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';
import { EmailValidator } from '@/interfaces/email-validator.interface';

const makeSut = (): signUpController => {
  class EmailValidatorStub implements EmailValidator {
    isvalid(email: string): boolean {
      console.log(email);
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  return new signUpController(emailValidatorStub);
};

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o nome ', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        email: 'hpsantos@bernhoet.com.br',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new missingParamError('name'));
  });
});

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o email ', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'helio pereira',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new missingParamError('email'));
  });
});

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o password ', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'hpsantos@bernhoet.com.br',
        passwordConfim: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new missingParamError('password'));
  });
});

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar a confirmação do password ', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'hpsantos@bernhoet.com.br',
        password: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new missingParamError('passwordConfim'));
  });
});

describe('sigUp Controller', () => {
  test('deve retornar 400 se o email for invalido ', () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'invalid_email',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new invalidParamError('email'));
  });
});
