import { httpResponse, httpRequest } from '../interfaces/https.interface';
export class signUpController {
  handle(httpRequest: httpRequest): httpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('missing param: name'),
      };
    }
    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('missing param: email'),
      };
    }
  }
}
