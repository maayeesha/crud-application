import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Prisma, Role } from '@prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';

@SkipThrottle() //skips for this route
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: Prisma.EmployeeCreateInput) {
    return this.doctorsService.create(createDoctorDto);
  }
@SkipThrottle({default: false}) //only for this it wont skip
  @Get()
  findAll(@Query('role') role?:Role) {
    return this.doctorsService.findAll(role);
  } 

@Throttle({short: {ttl:1000, limit: 1}})
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: Prisma.EmployeeUpdateInput) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
