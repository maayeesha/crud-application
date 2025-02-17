import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentStatus } from '@prisma/client';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @Roles('Admin') // only admins can create appointment
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async create(@Body() data: {patientId: number; doctorId: number; date: string },@Request() req: any) {
    console.log('User from request:', req.user); //debugging
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
  async updateStatus(@Param('id') id: number, @Body() data: { status: AppointmentStatus }) {
    return this.appointmentsService.updateAppointment(Number(id), data.status);
  }

  @Delete(':id')
  @Roles('Admin')
  async delete(@Param('id') id: number) {
    return this.appointmentsService.deleteAppointment(Number(id));
  }
  
}
