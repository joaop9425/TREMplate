import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());
    app.enableCors({
        origin: '*',
    });

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.setGlobalPrefix('api');

    const configService = app.get<ConfigService>(ConfigService);

    await app.listen(configService.get('APP_PORT') | 3000, () =>
        console.log(`open door: ${configService.get('APP_PORT') | 3000}`),
    );
}
bootstrap();
