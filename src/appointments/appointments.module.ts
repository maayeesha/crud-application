import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, DatabaseService],
})
export class AppointmentsModule {}
