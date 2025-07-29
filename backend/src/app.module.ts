import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './config/database/database.module';
import { ClientesModule } from './features/clientes/clientes.module';
import { ContratosModule } from './features/contratos/contratos.module';
import { FinanceiroModule } from './features/financeiro/financeiro.module';
import { OrdemServicoModule } from './features/ordem-servico/ordem-servico.module';
import { ProdutosModule } from './features/produtos/produtos.module';
import { ServicosModule } from './features/servicos/servicos.module';
import { VendasModule } from './features/vendas/vendas.module';
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
        ProdutosModule,
        ServicosModule,
        OrdemServicoModule,
        ContratosModule,
        VendasModule,
        FinanceiroModule,
        AddressesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
