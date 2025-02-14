import { Module ,Logger} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DoctorsModule } from './doctors/doctors.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsModule } from './appointments/appointments.module';


@Module({
  imports: [DatabaseModule, DoctorsModule,AppointmentsModule,
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
  AuthModule,
  AppointmentsModule],

  controllers: [AppController, AuthController, AppointmentsController],

  providers: [AppService,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  }, Logger, AppointmentsService],
})
export class AppModule {}
