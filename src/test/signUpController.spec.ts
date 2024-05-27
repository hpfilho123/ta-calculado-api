import { invalidParamError, missingParamError } from '@/exceptions/index';
import { signUpController } from '../controllers/signUp';
import { EmailValidator } from '@/interfaces/email-validator.interface';
import { AccountModel } from '@/interfaces/business/model/account';
import { AddAccount, AddAccountModel } from '@/interfaces/business/add-account';

interface sutTypes {
  sut: signUpController;
  emailValidatorStub: EmailValidator;
  addAccountStub: AddAccount;
}

const makeSut = (): sutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isvalid(email: string): boolean {
      return true;
    }
  }
  const emailValidatorStub = new EmailValidatorStub();
  const addAccountStub = makeAddAccount();
  const sut = new signUpController(emailValidatorStub, addAccountStub);
  return {
    sut,
    emailValidatorStub,
    addAccountStub,
  };
};
const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: '5',
        name: 'helio pereira',
        email: 'hpsantos@bernhoeft.com.br',
        password: 'Senha@123',
      };
      return fakeAccount;
    }
  }
  return new AddAccountStub();
};

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o nome ', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'hpsantos@bernhoet.com.br',
        password: 'Senha@123',
        passwordConfim: 'Senha@12345',
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
  test('deve retornar 400 se confirmação de email for invalida', () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'valid_email@gmail.com',
        password: 'Senha@123',
        passwordConfim: 'Senha@1234',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new invalidParamError('passwordConfim'));
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
  test('deve retornar chamar AddAccount quando os calores forem corretos', () => {
    const { sut, addAccountStub } = makeSut();
    const addSpy = jest.spyOn(addAccountStub, 'add');
    const httpRequest = {
      body: {
        name: 'helio pereira',
        email: 'invalid_email',
        password: 'Senha@123',
        passwordConfim: 'Senha@123',
      },
    };
    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'helio pereira',
      email: 'invalid_email',
      password: 'Senha@123',
    });
  });
});
