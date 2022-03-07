import { MikroORM, wrap, Entity, PrimaryKey, Property, ManyToOne, Reference, IdentifiedReference } from '@mikro-orm/core';

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

  @ManyToOne({ entity : () => Author, wrappedReference : true })
  author! : IdentifiedReference<Author>;

}

describe('Test', () => {
  let orm  : MikroORM;
  
  beforeAll( async () => {
    orm = await MikroORM.init({
      entities : [ Book, Author ],
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
    b.name = 'book1';
    const author = new Author();
    author.name = 'author1'
    b.author = wrap(author).toReference();
    wrap(b).setSchema('test');
    wrap(b.author).setSchema('test');
    await orm.em.fork().persistAndFlush(b);
    const books = await orm.em.getRepository(Book).findAll({ schema : 'test' });
    await books[0].author.load();
    // await orm.em.populate(books,['author']);//populating already loaded entities

    console.log(books[0])
    expect( wrap(books[0].author).isInitialized() ).toBe(true);
    expect(books[0].name).toBe('book1');
    expect(books[0].author.unwrap().name).toBe('author1');
  })

});
