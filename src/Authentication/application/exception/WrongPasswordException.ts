export default class WrongPasswordException extends Error {
  constructor(message = 'AuthErrors.WRONG_PASSWORD') {
    super(message);
    this.name = 'WrongPasswordException';
  }
}
