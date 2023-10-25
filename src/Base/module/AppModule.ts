import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import PrismaModule from 'Base/config/prisma/PrismaModule';
import { AppLoggerMiddleware } from 'Base/middlewares/HttpLoggerMiddleware';

import AuthenticationModule from 'Authentication/infrastructure/module/AuthenticationModule';

@Module({
  imports: [
    PrismaModule,
    AuthenticationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
