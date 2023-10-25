export default class PersonDoesntExistsException extends Error {
  constructor(message = 'AuthErrors.PERSON_DOSENT_EXIST') {
    super(message);
    this.name = 'PersonDoesntExistsException';
  }
}
