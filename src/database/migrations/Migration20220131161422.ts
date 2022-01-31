import { Migration } from '@mikro-orm/migrations';

export class Migration20220131161422 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "tenant" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "tenant" add constraint "tenant_pkey" primary key ("uuid");');

    this.addSql('create table "user" ("uuid" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tenant" cascade;');

    this.addSql('drop table if exists "user" cascade;');
  }

}
