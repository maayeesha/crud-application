import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { AuthService } from './auth.service';
const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).useMocker((token) => {
      const results = ['test1', 'test2'];
      if (token === AuthService) {
        return { findAll: jest.fn().mockResolvedValue(results) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
.compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
