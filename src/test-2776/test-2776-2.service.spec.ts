import { MikroORM, wrap } from '@mikro-orm/core';
import { Company, nameSchema } from './company.entity';
import { Customer } from './customer.entity';
import { Company as CompanyStructure } from './structure.company.entity';
import { Customer as CustomerStructure } from './structure.customer.entity';

describe('Test2776Service', () => {
  
  let orm  : MikroORM;
  

  beforeAll( async () => {
    orm = await MikroORM.init({
      entities : [ CompanyStructure ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true
    })

    await orm.getSchemaGenerator().refreshDatabase();
    await orm.getSchemaGenerator().updateSchema({ schema : 's1'});
    await orm.em.nativeDelete(Company,{},{ schema : 's1' });

    orm = await MikroORM.init({
      entities : [ CustomerStructure ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true
    })

    await orm.getSchemaGenerator().refreshDatabase();
    await orm.getSchemaGenerator().updateSchema({ schema : 's2'});
    await orm.em.nativeDelete(Customer,{},{ schema : 's2' });


    const company = require('./company.entity');
    const customer = require('./customer.entity');

    company.setSchemaCompany('s1');
    customer.setSchemaCustomer('s2');

    console.log('variable schemaName',company.nameSchema)
    
    orm = await MikroORM.init({
      entities : [ company.Company, customer.Customer ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true,
      // debug : true
    })

  });

  afterAll( () => {
    orm.close(true)
  });

  test('wildcard entities', async () => {
    const c = new Customer();
    c.name = 'e';
    c.company = new Company();
    c.company.name = 'c';
    wrap(c).setSchema('s2');
    wrap(c.company).setSchema('s1');
    await orm.em.fork().persistAndFlush(c);
    console.log('metadata', orm.getMetadata())
    // console.log('Here.....',orm)
    const [customerResp] = await orm.em.getRepository(Customer).findAll();
    // wrap(customer).setSchema('s2');
    // wrap(customer.company).setSchema('s1');
    // const resp = await orm.em.populate( customer, true );
    // const resp = await wrap(customer).populated(true);
    await wrap(customerResp).populated(true);
    // console.log(resp);

    expect( wrap(customerResp.company).getSchema() ).toBe('s1');
    expect( wrap(customerResp).getSchema() ).toBe('s2');
    expect(customerResp.name).toBe('e');
    expect( wrap(customerResp.company).isInitialized() ).toBe(true);
    expect(customerResp.company.name).toBe('c');
    
  })

});
