import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}
    @Post('login')
    login(@Body() input: {email:string; password:string}){
        return this.authService.authenticate(input)
    }
}
