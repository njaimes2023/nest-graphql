// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\users\users.module.ts
// --  ==============================================  

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module }      from '@nestjs/common';
import { User }         from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { ItemsModule } from 'src/items/items.module';
import { ListModule } from 'src/list/list.module';


@Module({
  providers: [UsersResolver, UsersService],
  imports: [
    TypeOrmModule.forFeature([ User ]),
    ItemsModule,
    //--"3List_CRUD" 
    ListModule
  ],
  exports: [
    TypeOrmModule,
    UsersService
  ]
})

export class UsersModule {}


