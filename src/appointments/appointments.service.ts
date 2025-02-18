import { BadRequestException, Injectable } from '@nestjs/common';
import { AppointmentStatus } from '@prisma/client';
import { DatabaseService } from '/Users/admin/Projects/hospital-prisma/src/database/database.service';

@Injectable()
export class AppointmentsService{
  constructor(private readonly databaseService: DatabaseService) {}

  async createAppointment(patientId:number, doctorId:number, date: Date) {  
    if (!patientId || !doctorId) {
      throw new BadRequestException('Invalid IDs provided');
    }

    // const admin = await this.databaseService.employee.findUnique({ where: { id: adminId}});
    // if (!admin || admin.role !== 'Admin') {
    //   throw new ForbiddenException('Only admins can create appointments');
    // }
    
    const patient = await this.databaseService.employee.findUnique({ where: { id: patientId } });
    if (!patient || patient.role !== 'Patient') {
      throw new BadRequestException('User must be a patient to create an appointment');
    }

    const doctor = await this.databaseService.employee.findUnique({ where: { id: doctorId } });
    if (!doctor || doctor.role !== 'Doctor') {
      throw new BadRequestException('Doctor not found');
    }
    const appointment = await this.databaseService.appointment.create({
      data: {
        patientId,
        doctorId,
        date: date,
        status: AppointmentStatus.PENDING
      },
    });
    return appointment;
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
