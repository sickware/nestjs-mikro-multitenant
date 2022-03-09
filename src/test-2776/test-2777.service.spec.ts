import { MikroORM, wrap, Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';

@Entity({ schema : '*' })
export class Author{
  @PrimaryKey()
  id! : number;
  
  @Property()
  name! : string;
}

@Entity({ schema : '*' })
export class Book{
  @PrimaryKey()
  id! : number;

  @Property()
  name! : string;

  @ManyToOne({ entity : () => Author })
  author! : Author;
}

describe('Test', () => {
  
  let orm  : MikroORM;
  

  beforeAll( async () => {
    orm = await MikroORM.init({
      entities : [ Author, Book ],
      type : 'postgresql',
      dbName : 'mikro_orm_test_gh_2776',
      user : 'postgres',
      password : '13051997ec',
      allowGlobalContext : true,
      // debug : true
    })

    await orm.getSchemaGenerator().refreshDatabase();
    await orm.getSchemaGenerator().updateSchema({ schema : 'test'});
    await orm.em.nativeDelete(Book,{},{ schema : 'test' });
  });

  afterAll( () => {
    orm.close(true)
  });

  test('populate already loaded entities', async () => {
    const b = new Book();
    b.name = 'b';
    const author = new Author();
    author.name = 'a';
    b.author = author;
    wrap(b).setSchema('test');
    wrap(b.author).setSchema('test');
    await orm.em.fork().persistAndFlush(b);
    const books = await orm.em.getRepository(Book).findAll({ schema : 'test' });
    console.log(books)
    console.log('Here...',wrap(books[0]).getSchema());
    await orm.em.populate(books,['author'], { schema : 'test' });//populating already loaded entities

    expect( wrap(books[0].author).isInitialized() ).toBe(true);
    expect(books[0].name).toBe('b');
    expect(books[0].author.name).toBe('a');
  })

});
