// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\list.module.ts
// --  ==============================================  

import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

import { List } from './entities/list.entity';

import { ListItemModule } from './../list-item/list-item.module';

@Module({
  providers: [ListResolver, ListService],
  imports: [
    TypeOrmModule.forFeature([ List ]),
    ListItemModule,
  ],
  exports: [
    TypeOrmModule,
    ListService,    
  ]
  
})
export class ListModule {}
