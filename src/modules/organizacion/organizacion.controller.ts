import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { OrganizacionDto } from './dto/organizacion.dto';
import { OrganizacionService } from './organizacion.service';

@Controller('organizacion')
export class OrganizacionController {

    constructor(
        private readonly organizacionService : OrganizacionService
    ){}

    @Post()
    saveOrganizacion(@Body() body : OrganizacionDto){
        return this.organizacionService.saveOrganizacion( body, 'public' );
    }
}
