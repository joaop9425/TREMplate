import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async register(registerData: RegisterDTO) {
        try {
            const hashedPassword = await bcrypt.hash(
                registerData.password,
                await bcrypt.genSalt(10),
            );
            const createdUser = await this.usersService.newUser({
                ...registerData,
                password: hashedPassword,
            });
            delete createdUser.password;
            return createdUser;
        } catch (error) {
            throw new HttpException(error, HttpStatus.CONFLICT);
        }
    }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        const access_token = this.jwtService.sign(payload, {
            expiresIn: '15m',
        });
        const refresh_token = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });

        await this.usersService.setCurrentRefreshToken(refresh_token, user.id);

        return { access_token, refresh_token };
    }

    async refresh(userId: number, refreshToken: string) {
        const user = await this.usersService.findById(userId);
        if (user && user.refreshToken === refreshToken) {
            return this.login(user);
        }
        throw new UnauthorizedException();
    }
}
