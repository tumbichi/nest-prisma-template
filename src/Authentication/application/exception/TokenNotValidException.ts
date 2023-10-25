export default class TokenNotValidException extends Error {
  constructor(message = 'AuthErrors.AUTHORIZATION_NOT_VALID') {
    super(message);
    this.name = 'TokenNotValidException';
  }
}
