import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import Role from './role.enum';
import { CreateUserDTO } from './user.dto';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private repo: Repository<UsersEntity>,
    ) {}

    async newUser(user: CreateUserDTO) {
        // const hashedPassword = await bcrypt.hash(user.password, 10);
        if (await this.findByEmail(user.email)) {
            throw new HttpException(
                'email já cadastrado na base',
                HttpStatus.AMBIGUOUS,
            );
        }
        const newUser = this.repo.create({
            ...user,
            // password: hashedPassword,
        });
        return await this.repo.save(newUser);
    }

    async getAll() {
        return await this.repo.find();
    }

    async getAllCustomers() {
        return await this.repo.find({
            where: {
                roles: Role.User,
            },
        });
    }

    async getAllServicers() {
        return await this.repo.find({
            where: {
                roles: Role.Servicer,
            },
        });
    }

    async getAllAdmins() {
        return await this.repo.find({
            where: {
                roles: Role.Admin,
            },
        });
    }

    async findById(id: number) {
        return await this.repo.findOne({
            where: { id },
        });
    }

    async findByName(name: string) {
        return await this.repo.find({
            where: { name },
        });
    }

    async findByEmail(email: string) {
        const user = await this.repo.findOne({
            select: ['email', 'name', 'password', 'id'],
            where: { email },
        });
        return user;
    }

    async lastLogin(id: number) {
        await this.repo.update(id, { lastLogin: new Date() });
    }

    async setCurrentRefreshToken(refreshToken: string, userId: number) {
        const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        return await this.repo.update(userId, {
            currentHashedRefreshToken,
        });
    }

    async getUserIfRefreshTokenMatches(refreshToken: string, userId: number) {
        const user = await this.findById(userId);

        const isRefreshTokenMatching = await bcrypt.compare(
            refreshToken,
            user.currentHashedRefreshToken,
        );

        if (isRefreshTokenMatching) {
            return user;
        }
    }

    async removeRefreshToken(userId: number) {
        return await this.repo.update(userId, {
            currentHashedRefreshToken: null,
        });
    }
}
