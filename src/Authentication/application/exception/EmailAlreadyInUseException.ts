export default class EmailAlreadyInUseException extends Error {
  constructor(message = 'AuthErrors.EMAIL_ALREADY_EXIST') {
    super(message);
    this.name = 'EmailAlreadyInUseException';
  }
}
