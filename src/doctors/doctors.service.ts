import { Injectable,NotFoundException } from '@nestjs/common';
import { Prisma,Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { instance as logger } from 'logger/winston.logger'; 
import * as bcrypt from 'bcrypt'; // Import bcrypt


@Injectable()
export class DoctorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createDoctorDto: Prisma.EmployeeCreateInput) {
    try {
      const rawPassword = createDoctorDto.password || '';
      const SALT = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(rawPassword, SALT); 

      const doctor = await this.databaseService.employee.create({ data: {
        ...createDoctorDto,
        password: hashedPassword, 
      } });
      logger.info(`Doctor created successfully - ${doctor.id}`); 
      return doctor;
    } catch (error) {
      logger.error(`Unable to create doctor: ${error.message}`, { stack: error.stack }); 
      throw error;
    }
  }

  // async update(id: number, updateDoctorDto: Prisma.EmployeeUpdateInput) {
  //   return this.databaseService.employee.update({
  //     where: {
  //       id,
  //     },
  //     data:updateDoctorDto
  //   })
  // }
  

  async findAll(role?: Role) {
    const whereCondition = role ? { role } : {}; 
    return this.databaseService.employee.findMany({
      where: whereCondition,
    });
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

  async findByEmail(email: string) {
    try {
      const doctor = await this.databaseService.employee.findUnique({
        where: { email},
      });

      if (!doctor) {
        throw new NotFoundException(`Doctor with email ${email} not found`);
      }

      logger.info(`Fetched doctor with email: ${email}`);
      return doctor;
    } 
    catch (error) {
      logger.error(`Error fetching doctor with email: ${email}: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }
  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateDoctorDto: Prisma.EmployeeUpdateInput) {
    try {
      if (updateDoctorDto.password) {
        const rawPassword = updateDoctorDto.password as string; // Ensure it's a string
        const SALT = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, SALT);
  
        // Use Prisma's `set` operator for updates
        updateDoctorDto.password = { set: hashedPassword };
      }
  
      const updatedDoctor = await this.databaseService.employee.update({
        where: { id },
        data: updateDoctorDto,
      });
  
      logger.info(`Doctor with ID ${id} updated successfully`);
      return updatedDoctor;
    } catch (error) {
      logger.error(`Unable to update doctor with ID ${id}: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }
  

  async findByRoles(roles: Role[]) {
    return this.databaseService.employee.findMany({
      where: {
        role: { in: roles }, 
      },
    });
  }
}
