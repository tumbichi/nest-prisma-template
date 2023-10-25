export default class InvalidPasswordException extends Error {
  constructor(message = 'AuthErrors.INVALID_PASSWORD_EXCEPTION') {
    super(message);
    this.name = 'InvalidPasswordException';
  }
}
