
// -- ==============================================   
// --  proyecto:  < 03-anylist >
// --  seccion :   < Items_usuarios_peticionesAutenticadas .sql > < seccion 8>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-5.SEED_Data_cargar_PurgarBD
// --  file    :  src\seed\seed.module.ts
// --  ==============================================  

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ItemsModule } from 'src/items/items.module';
import { UsersModule } from 'src/users/users.module';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

import { ListModule } from './../list/list.module';
import { ListItemModule } from './../list-item/list-item.module';
@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    ItemsModule,
    ListItemModule,
    ListModule,
    UsersModule,
   ]
  
})
export class SeedModule {}
