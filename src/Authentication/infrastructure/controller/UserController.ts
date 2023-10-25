import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import User from 'Authentication/domain/models/User';

import UserService from 'Authentication/application/service/UserService';
import JwtAuthGuard from 'Authentication/infrastructure/guards/JwtAuthGuard';

@Controller('users')
export default class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.fetchAllUsers().then((users) => users);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/:id')
  async getUserById(@Param('id') userId: string): Promise<User> {
    return this.userService
      .findUserById(userId)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'UserDoesntExistsException': {
            throw new HttpException(error.message, 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  async deleteUser(@Param('id') userId: string): Promise<boolean> {
    return this.userService
      .deleteUser(userId)
      .then((userDeleted) => !!userDeleted)
      .catch((error) => {
        switch (error.name) {
          case 'UserDoesntExistsException': {
            throw new HttpException(error.message, 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }
}
