
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\items\items.module.ts
// --  ==============================================  


import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

import { Item } from './entities/item.entity';

@Module({
  providers: [
     ItemsResolver, 
     ItemsService],
  
  imports: [
    TypeOrmModule.forFeature([ Item ])
  ],
  //itemCount
  exports: [
    ItemsService,
    TypeOrmModule //seed
  ]

})
export class ItemsModule {}
