import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import AuthenticationController from '../controller/AuthenticationController';
import AuthenticationService from '../../application/service/AuthenticationService';
import UserDataProvider from '../dataProvider/UserDataProvider';
import UserRepository from 'Authentication/application/repository/UserRepository';

import JwtStrategy from 'Authentication/infrastructure/strategy/JwtStrategy';
import LocalStrategy from 'Authentication/infrastructure/strategy/LocalStrategy';
import UserService from 'Authentication/application/service/UserService';

const jwtFactory = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get('JWT_EXP_D'),
    },
  }),
  inject: [ConfigService],
};

@Module({
  imports: [JwtModule.registerAsync(jwtFactory), PassportModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    {
      provide: UserRepository,
      useClass: UserDataProvider,
    },
  ],
  exports: [AuthenticationService, JwtModule, JwtStrategy, PassportModule],
})
export default class UserModule {}
