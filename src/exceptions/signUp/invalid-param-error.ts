export class invalidParamError extends Error {
  constructor(paramName: string) {
    super(`invalid param: ${paramName}`);
    this.name = 'invalidParamError';
  }
}
