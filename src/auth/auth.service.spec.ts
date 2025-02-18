import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DoctorsService } from '/Users/admin/Projects/hospital-prisma/src/doctors/doctors.service'; 
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: DoctorsService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(null), // Mock method
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mockToken'), // Mock JWT method
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
