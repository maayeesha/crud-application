import { Inject, Injectable, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DoctorsService } from 'src/doctors/doctors.service';
import * as bcrypt from 'bcrypt'; 
type AuthInput = { email: string; password: string};
type SignInData = { userId: number; email: string, role: string};
type AuthResult = {accessToken: string, userId: number, email: string}

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => DoctorsService))
        private usersService: DoctorsService,
        private jwtService: JwtService){ }

    async authenticate(input: AuthInput): Promise<AuthResult>{
const user = await this.validateUser(input);
if(!user){
    throw new UnauthorizedException();
}
return this.signIn(user);
}
    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.usersService.findByEmail(input.email)
        if(user && await bcrypt.compare(input.password, user.password)) {
            return {
                userId: user.id,
                email: user.email,
                role: user.role
            }
        }
        return null;
    }
    async signIn(user: SignInData) : Promise<AuthResult>{
        const tokenPayLoad = {
            id: user.userId,
            email: user.email,
            role: user.role
        }
        const accessToken = await this.jwtService.signAsync(tokenPayLoad)
        return { accessToken, email: user.email, userId: user.userId}
    }
}
