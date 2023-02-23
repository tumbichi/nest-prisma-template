import { Global, Module } from '@nestjs/common';
import PrismaClient from './PrismaClient';

@Global()
@Module({
  providers: [PrismaClient],
  exports: [PrismaClient],
})
export default class PrismaModule {}
