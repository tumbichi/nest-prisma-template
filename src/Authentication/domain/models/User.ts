import InvalidEmailException from '../exception/InvalidEmailException';
import Role from './Role';

export default class User {
  name: string;
  email: string;
  role: Role;
  id?: number;

  constructor(name: string, email: string, role: Role, id?: number) {
    if (!this.validateEmail(email)) {
      throw new InvalidEmailException();
    }

    this.name = name;
    this.email = email;
    this.role = role;
    this.id = id;
  }

  private readonly validateEmail = (email: string): boolean => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
}
