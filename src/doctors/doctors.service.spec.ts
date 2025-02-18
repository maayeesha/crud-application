import { Test, TestingModule } from '@nestjs/testing';
import { DoctorsService } from './doctors.service';
import { DatabaseService } from '/Users/admin/Projects/hospital-prisma/src/database/database.service';


describe('DoctorsService', () => {
  let service: DoctorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: DatabaseService,
          useValue: {
            // Mock methods if necessary
            find: jest.fn(),
          },
        },
      ],
    }).compile();


    service = module.get<DoctorsService>(DoctorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
