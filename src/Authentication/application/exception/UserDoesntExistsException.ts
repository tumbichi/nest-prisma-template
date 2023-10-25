export default class UserDoesntExistsException extends Error {
  constructor(message = 'AuthErrors.USER_DOSENT_EXIST') {
    super(message);
    this.name = 'UserDoesntExistsException';
  }
}
