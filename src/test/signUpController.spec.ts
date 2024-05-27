import {
  invalidParamError,
  missingParamError,
  ServerError,
} from '@/exceptions/index';
import { signUpController } from '../controllers/signUp';
import { EmailValidator } from '@/interfaces/email-validator.interface';

interface sutTypes {
  sut: signUpController;
  emailValidatorStub: EmailValidator;
}

const makeSut = (): sutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isvalid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const sut = new signUpController(emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o nome ', () => {
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut } = makeSut();
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
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isvalid').mockReturnValueOnce(false);
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

describe('sigUp Controller', () => {
  test('deve chamar emailValidatorStub  com o email correto', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isvalid');
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'valid_email@gmail.com',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    sut.handle(httpRequest);
    expect(isValidSpy).toHaveBeenCalledWith('valid_email@gmail.com');
  });
});

describe('sigUp Controller', () => {
  test('deve retornar 500 se o email for throws ', () => {
    class EmailValidatorStub implements EmailValidator {
      isvalid(email: string): boolean {
        throw new Error();
      }
    }
    const emailValidatorStub = new EmailValidatorStub();
    const sut = new signUpController(emailValidatorStub);
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'valid_email@gmail.com',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
