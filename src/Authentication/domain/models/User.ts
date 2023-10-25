import { Exclude } from 'class-transformer';
import InvalidEmailException from '../exception/InvalidEmailException';
import Role from './Role';

export default class User {
  name: string;
  email: string;
  role: Role;
  @Exclude()
  password: string;
  id?: string;

  constructor(
    name: string,
    email: string,
    role: Role,
    password: string,
    id?: string,
  ) {
    if (!User.validateEmail(email)) {
      throw new InvalidEmailException();
    }

    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.id = id;
  }

  private static readonly validateEmail = (email: string): boolean => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };
}
