export default class AdressNotFoundException extends Error {
  constructor(message = 'AuthErrors.ADRESS_DOSENT_EXIST') {
    super(message);
    this.name = 'AdressNotFoundException';
  }
}
