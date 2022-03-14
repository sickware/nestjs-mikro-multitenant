
## Populating already loaded entities with wildcard schema doesn't work with implicit schema

Hello, I'm currently working with wildcard schema entities and I was trying to populate some entities after load them. I try to use just the method `populate()` without especify the schema because the entities loaded already have the schema. But it doesn't work, I need to especify the schema inside the method.

Test case:

```typescript
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
      type : 'postgresql'
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

    console.log('Schema book',wrap(books[0]).getSchema());
    console.log('Schema author:',wrap(books[0].author).getSchema());

    await orm.em.populate(books,['author']);//populating already loaded entities
    
    expect( wrap(books[0]).getSchema() ).toBe('test');
    expect( wrap(books[0].author).getSchema() ).toBe('test');
    expect( wrap(books[0].author).isInitialized() ).toBe(true);
    expect(books[0].name).toBe('b');
    expect(books[0].author.name).toBe('a');
  })
});
```

This test case only pass if you specify the schema inside the 'populate()'.

```typescript
await orm.em.populate(books,['author'],{ schema: 'test' });
```

But it's probably a bit redundant, because the entities already have the schema. So I don't know if it is a bug.

|Dependency|Version|
|----------|-------|
|node|17.2.0|
|mikro|5.1.0|