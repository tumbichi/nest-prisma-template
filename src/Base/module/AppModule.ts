import { Module } from '@nestjs/common';

import PrismaModule from 'Base/config/prisma/PrismaModule';
import AuthenticationModule from 'Authentication/infrastructure/module/AuthenticationModule';

@Module({
  imports: [PrismaModule, AuthenticationModule],
})
export class AppModule {}
