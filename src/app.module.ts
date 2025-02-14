import { Module ,Logger} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DatabaseModule, DoctorsModule,
  ThrottlerModule.forRoot([{
    name: 'short',
    ttl: 1000,
    limit: 3,
  },
  {
    name: 'long',
    ttl: 60000,
    limit: 100,
  }]),
  AuthModule],

  controllers: [AppController, AuthController],

  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }, Logger],
})
export class AppModule {}
