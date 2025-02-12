import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from 'src/users/dto/updateUserDto';

@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService){}
  async create(createDoctorDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createDoctorDto
    })
  }

  async findAll(role?:'Doctor' | 'Patient' | 'Admin') {
    if(role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })
  }

  findOne(id: number) {
    return this.databaseService.employee.findUnique({
      where: {
        id
      },
    });
  }

  async update(id: number, updateDoctorDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data:updateDoctorDto
    })
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    })
  }
}
