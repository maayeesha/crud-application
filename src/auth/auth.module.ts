import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import {JWT_SECRET} from 'src/configs/jwt-secret'
import { DoctorsModule } from 'src/doctors/doctors.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  imports: [forwardRef(()=>DoctorsModule),
  JwtModule.register({
    global: true,
    secret : JWT_SECRET,
    signOptions: { expiresIn: '1h'}
  })],
  exports: [AuthService]
})

export class AuthModule {}
