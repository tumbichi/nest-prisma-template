import { Module } from '@nestjs/common';
import AuthenticationController from '../controller/AuthenticationController';
import AuthenticationService from '../../application/service/AuthenticationService';
import UserDataProvider from '../dataProvider/UserDataProvider';
import UserRepository from 'Authentication/application/repository/UserRepository';

@Module({
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    {
      provide: UserRepository,
      useClass: UserDataProvider,
    },
  ],
  exports: [AuthenticationService],
})
export default class UserModule {}
