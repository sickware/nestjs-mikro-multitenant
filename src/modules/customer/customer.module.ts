import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from '../../database/global-models/sucursal/customer.entity';

@Module({
  imports : [
    MikroOrmModule.forFeature([
      Customer
    ])
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
