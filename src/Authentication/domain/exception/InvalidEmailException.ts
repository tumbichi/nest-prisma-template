export default class InvalidEmailException extends Error {
  constructor(message = 'Invalid email') {
    super(message);
    this.name = 'InvalidEmailException';
  }
}
