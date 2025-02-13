import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { WinstonModule } from 'nest-winston';
import { instance } from 'logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: instance,
    })
  });
  
  app.enableCors();
  app.setGlobalPrefix
  await app.listen(3002);
}
bootstrap();
