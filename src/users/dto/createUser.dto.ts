import {IsEmail,IsEnum,IsNotEmpty,IsString} from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsEnum(["Doctor" , "Patient" , "Admin"],{
        message: "Valid role required"
    })
    role: 'Doctor' | 'Patient' | 'Admin';
    //password:string;
}