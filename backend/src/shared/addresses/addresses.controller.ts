import { Controller, Get, Query } from '@nestjs/common';
import { AddressesService } from './addresses.service';

@Controller('addresses')
export class AddressesController {
    constructor(private readonly service: AddressesService) {}

    @Get('cities')
    getAllCities() {
        return this.service.getAllCities();
    }

    @Get('states')
    getAllStates() {
        return this.service.getAllStates();
    }

    @Get('cities/:stateId')
    getCitiesByState(@Query('stateId') stateId: string) {
        return this.service.getCitiesByState(+stateId);
    }
}
