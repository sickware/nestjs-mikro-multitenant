import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from '../../database/global-models/sucursal/customer.entity';
import { Company } from '../../database/models/empresa/company.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([
      Customer,
      Company
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
