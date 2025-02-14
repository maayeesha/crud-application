import { Injectable } from '@nestjs/common';
import { AppointmentStatus } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AppointmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createAppointment(patientId: number, doctorId: number, date: Date) {
    return this.databaseService.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
      },
    });
  }

  async getAppointmentsByDoctor(doctorId: number) {
    return this.databaseService.appointment.findMany({
      where: { doctorId },
      include: { patient: true },
    });
  }

  async getAppointmentsByPatient(patientId: number) {
    return this.databaseService.appointment.findMany({
      where: { patientId },
      include: { doctor: true },
    });
  }

  async updateAppointment(id: number, status: string) {
    return this.databaseService.appointment.update({
      where: { id },
      data: { status: status as AppointmentStatus }, 
    });
  }

  async deleteAppointment(id: number) {
    return this.databaseService.appointment.delete({
      where: { id },
    });
  }
}
