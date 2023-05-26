import { NestFactory } from '@nestjs/core';
import { AppModule } from 'Base/module/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
  console.log(`running on port ${process.env.PORT || 3000} `);
}

bootstrap();
