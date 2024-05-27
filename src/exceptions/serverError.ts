export class serverError extends Error {
  constructor() {
    super('Internal Server Error');
    this.name = 'ServerError';
  }
}
