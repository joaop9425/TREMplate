import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './config/database/database.module';
import { ClientesModule } from './features/clientes/clientes.module';
import { AddressesModule } from './shared/addresses/addresses.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                APP_PORT: Joi.number(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USER: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DB: Joi.string().required(),
            }),
        }),
        DatabaseModule,
        UsersModule,
        AuthenticationModule,
        ClientesModule,
        AddressesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
