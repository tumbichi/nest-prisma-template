import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';

import User from '../../domain/models/User';
import { LocalAuthGuard } from '../guards/LocalAuthGuard';
import LoginResponseDto from 'Authentication/application/dto/LoginResponseDto';
import JwtAuthGuard from '../guards/JwtAuthGuard';
import SignUpDto from 'Authentication/application/dto/SignUpDto';
import { ZodValidationPipe } from 'Base/pipe/ZodValidationPipe';
import SignUpSchema from 'Authentication/application/schema/SignUpSchema';
import AuthenticationService from '../../application/service/AuthenticationService';

@Controller('auth')
export default class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  async login(
    @Req() request: Request & { user: User },
  ): Promise<LoginResponseDto> {
    return this.authenticationService
      .login(request.user)
      .then((loginResponse) => loginResponse)
      .catch((error) => {
        switch (error.name) {
          case 'WrongPasswordException': {
            throw new HttpException('Contraseña incorrecta', 404);
          }
          case 'UserDoesntExistsException': {
            throw new HttpException('El usuario no existe', 404);
          }
          default: {
            const errorMessage =
              typeof error.message === 'string' ? error.message : undefined;
            throw new UnauthorizedException(error, errorMessage);
          }
        }
      });
  }
  @UsePipes(new ZodValidationPipe(SignUpSchema))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/sign-up')
  async signUpUser(@Body() singUpUserDto: SignUpDto): Promise<User> {
    return this.authenticationService
      .signUp(singUpUserDto)
      .then((user) => user)
      .catch((error) => {
        switch (error.name) {
          case 'InvalidEmailException': {
            throw new HttpException('Email invalido', 404);
          }
          case 'InvalidPasswordException': {
            throw new HttpException('Password invalido', 404);
          }
          default: {
            throw new HttpException(error.message, 500);
          }
        }
      });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/validate-authorization')
  async validateAuthorization(
    @Req() request: Request & { user: User },
  ): Promise<User> {
    return request.user;
  }
}
