import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { CreateUserDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private service: UsersService) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get('servicers')
    getAllServicers() {
        return this.service.getAllServicers();
    }

    @Get('customers')
    getAllCustomers() {
        return this.service.getAllCustomers();
    }

    @Post()
    newUser(@Body() user: CreateUserDTO) {
        return this.service.newUser(user);
    }

    @Get('email/:email')
    getByEmail(@Param('email') email: string) {
        return this.service.findByEmail(email);
    }

    @Get('id/:id')
    getById(@Param('id') id: string) {
        return this.service.findById(Number(id));
    }

    @Get('name/:name')
    getByName(@Param('name') name: string) {
        return this.service.findByName(name);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return 'teste ok ' + id;
    }
}
