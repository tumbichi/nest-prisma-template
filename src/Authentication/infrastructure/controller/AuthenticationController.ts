import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';

import User from '../../domain/models/User';

import AuthenticationService from '../../application/service/AuthenticationService';
import CreateUserDto from '../../application/dto/CreateUserDto';

@Controller('auth')
export default class AuthenticationController {
  constructor(private userService: AuthenticationService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.fetchAllUsers().then((users) => users);
  }

  @Get('/:id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    // console.log('getUserB', getUserB)
    return this.userService
      .findUserById(parseInt(userId))
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Post('/create-admin')
  async createAdminUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService
      .createUserAdmin(createUserDto)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'InvalidEmailException': {
            throw new HttpException(error.message, 400);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService
      .createUser(createUserDto)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'InvalidEmailException': {
            throw new HttpException(error.message, 400);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<boolean> {
    return this.userService
      .deleteUser(parseInt(userId))
      .then((userDeleted) => !!userDeleted)
      .catch((error) => {
        switch (error.name) {
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
