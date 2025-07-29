import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/authentication/guards/jwt.guard';
import { RolesGuard } from 'src/authentication/guards/role.guard';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clienteService: ClientesService) {}

    @Post()
    create(@Body() dto: CreateClienteDto) {
        return this.clienteService.create(dto);
    }

    @Get('admindata/:id')
    getAdminStuffId(@Param('id') id: string) {
        return { message: 'Se chegou aqui, tu é admin! ' + id };
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Get('admindata')
    getAdminStuff() {
        return { message: 'Se chegou aqui, tu é admin!' };
    }

    @Get()
    findAll() {
        return this.clienteService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.clienteService.findOne(+id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateClienteDto) {
        return this.clienteService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.clienteService.remove(+id);
    }
}
