import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import User from '../../domain/models/User';
import Role from '../../domain/models/Role';

import LoginResponseDto from '../dto/LoginResponseDto';
import { JwtService } from '@nestjs/jwt';
import SignUpDto from '../dto/SignUpDto';
import InvalidPasswordException from '../exception/InvalidPasswordException';
import UserService from './UserService';

@Injectable()
export default class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { email: user.email, id: user.id };

    const accessToken = this.jwtService.sign(payload);

    return { user, accessToken };
  }

  async signUpAdmin(signUpDto: SignUpDto): Promise<User> {
    const isPasswordValid = AuthenticationService.validatePassword(
      signUpDto.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    const passwordHashed = await bcrypt.hash(signUpDto.password, 10);

    const userCreated = await this.userService.createUser({
      email: signUpDto.email,
      name: signUpDto.name,
      role: Role.ADMIN,
      passwordHashed,
    });

    return userCreated;
  }

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const isPasswordValid = AuthenticationService.validatePassword(
      signUpDto.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordException();
    }

    const passwordHashed = await bcrypt.hash(signUpDto.password, 10);

    const userCreated = await this.userService.createUser({
      email: signUpDto.email,
      name: signUpDto.name,
      role: Role.USER,
      passwordHashed,
    });

    return userCreated;
  }

  private static validatePassword(password: string) {
    // Is at least 6 characters long, contains at least one leter and contains at least one number
    const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  }
}
