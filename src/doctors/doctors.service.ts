import { Injectable,NotFoundException } from '@nestjs/common';
import { Prisma,Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { instance as logger } from 'logger/winston.logger'; 
@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) {}



  async create(createDoctorDto: Prisma.EmployeeCreateInput) {
    try {
      const doctor = await this.databaseService.employee.create({ data: createDoctorDto });
      logger.info(`Doctor created successfully - ${doctor.id}`); 
      return doctor;
    } catch (error) {
      logger.error(`Unable to create doctor: ${error.message}`, { stack: error.stack }); 
      throw error;
    }
  }

  async findAll(role?: Role) {
    if(role) return this.databaseService.employee.findMany({
      where: {
        role,
      }
    })
  }

  async findOne(id: number) {
    try {
      const doctor = await this.databaseService.employee.findUnique({
        where: { id },
      });

      if (!doctor) {
        throw new NotFoundException(`Doctor with ID ${id} not found`);
      }

      logger.info(`Fetched doctor with ID ${id}`);
      return doctor;
    } catch (error) {
      logger.error(`Error fetching doctor with ID ${id}: ${error.message}`, { stack: error.stack });
      throw error;
    }
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
