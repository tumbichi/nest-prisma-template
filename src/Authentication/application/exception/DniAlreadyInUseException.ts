export default class DniAlreadyInUseException extends Error {
  constructor(message = 'AuthErrors.DNI_ALREADY_EXIST') {
    super(message);
    this.name = 'DniAlreadyInUseException';
  }
}
