import { signUpController } from '../controllers/signUp';
import { missingParamError } from '@/exceptions/signUp/missin-param-error';

describe('sigUp Controller', () => {
  test('deve retornar 400 se nao enviar o nome ', () => {
    const sut = new signUpController();
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
    const sut = new signUpController();
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
