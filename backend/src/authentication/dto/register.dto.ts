import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
