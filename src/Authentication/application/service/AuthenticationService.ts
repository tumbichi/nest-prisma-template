import { Injectable } from '@nestjs/common';

import User from '../../domain/models/User';
import Role from '../../domain/models/Role';

import UserRepository from '../repository/UserRepository';
import CreateUserDto from '../dto/CreateUserDto';

@Injectable()
export default class AuthenticationService {
  constructor(private readonly repository: UserRepository) {}

  async createUserAdmin(userDto: CreateUserDto): Promise<User> {
    const user = new User(userDto.name, userDto.email, Role.ADMIN);

    const userCreated = await this.repository.insert(user);

    return userCreated;
  }

  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = new User(userDto.name, userDto.email, Role.USER);

    const userCreated = await this.repository.insert(user);

    return userCreated;
  }

  async deleteUser(userId: number): Promise<User> {
    return await this.repository.delete(userId);
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.repository.findById(userId);

    if (user === null) {
      throw new Error("User doesn't exists");
    }

    return user;
  }

  async fetchAllUsers(): Promise<User[]> {
    const users = await this.repository.findAll();

    return users;
  }
}
