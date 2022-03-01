import { MikroORM, wrap } from '@mikro-orm/core';
import { Company } from './company.entity';
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
    await orm.getSchemaGenerator().updateSchema({ schema : 's2'});
    await orm.em.nativeDelete(Company,{},{ schema : 's2' });

    orm = await MikroORM.init({
      entities : [ CustomerStructure ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true
    })

    await orm.getSchemaGenerator().refreshDatabase();
    await orm.getSchemaGenerator().updateSchema({ schema : 's3'});
    await orm.em.nativeDelete(Customer,{},{ schema : 's3' });

    orm = await MikroORM.init({
      entities : [ Company, Customer ],
      dbName : 'mikro_orm_test_gh_2776',
      type : 'postgresql',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true,
      debug : true
    })

  });

  afterAll( () => {
    orm.close(true)
  });

  test('wildcard entities', async () => {
    const c = new Customer('s2');
    c.name = 'e';
    c.company = new Company();
    c.company.name = 'c';
    wrap(c).setSchema('s3');
    wrap(c.company).setSchema('s2');
    await orm.em.fork().persistAndFlush(c);
    const res = await orm.em.getRepository(Customer).findAll({ populate : true, schema : 's3' });
    expect(res).toHaveLength(1);
    expect(wrap(res[0].company).isInitialized()).toBe(true);
    expect( res[0].name ).toBe('e');
    expect( res[0].company.name).toBe('c');
  })

});
