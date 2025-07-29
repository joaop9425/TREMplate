import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UnauthorizedException,
    UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthenticationService } from './authentication.service';
import { RegisterDTO } from './dto/register.dto';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly userService: UsersService,
        private configService: ConfigService,
    ) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDTO) {
        return this.authenticationService.register(registrationData);
    }

    @Post('login')
    async login(@Body() loginDto: { email: string; password: string }) {
        const user = await this.authenticationService.validateUser(
            loginDto.email,
            loginDto.password,
        );
        if (!user) throw new UnauthorizedException();
        return this.authenticationService.login(user);
    }

    @Post('refresh')
    async refresh(@Body() data: { userId: number; refreshToken: string }) {
        return this.authenticationService.refresh(
            data.userId,
            data.refreshToken,
        );
    }
}
