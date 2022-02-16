import { Controller, Get, Headers } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {

    constructor(
        private readonly customerService : CustomerService
    ){}

    @Get()
    getCustomers(@Headers('x-tenant-id') tenant : string){
        return this.customerService.getCustomers( tenant );
    }

    
    
}
