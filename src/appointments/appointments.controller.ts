import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentStatus } from '@prisma/client';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(@Body() data: { patientId: number; doctorId: number; date: string }) {
    return this.appointmentsService.createAppointment(data.patientId, data.doctorId, new Date(data.date));
  }

  @Get('doctor/:doctorId')
  async getAppointmentsByDoctor(@Param('doctorId') doctorId: number) {
    return this.appointmentsService.getAppointmentsByDoctor(Number(doctorId));
  }

  @Get('patient/:patientId')
  async getAppointmentsByPatient(@Param('patientId') patientId: number) {
    return this.appointmentsService.getAppointmentsByPatient(Number(patientId));
  }

  @Patch(':id')
  async updateStatus(@Param('id') id: number, @Body() data: { status: string }) {
    return this.appointmentsService.updateAppointment(Number(id), data.status);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.appointmentsService.deleteAppointment(Number(id));
  }
  @Post('/update/:id')
async updateAppointment(@Param('id') id: number, @Body() data: { status: AppointmentStatus }) {
  return this.appointmentsService.updateAppointment(Number(id), data.status);
}
}
