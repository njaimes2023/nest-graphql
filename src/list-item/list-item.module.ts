// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\list-item.module.ts
// --  ==================================================================  
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { ListItemService } from './list-item.service';
import { ListItemResolver } from './list-item.resolver';

@Module({
  providers: [ListItemResolver, ListItemService],
  //--4ListItems_DetalleListas
  imports: [
    TypeOrmModule.forFeature([ ListItem ])
  ],
  //--4ListItems_DetalleListas
  exports: [
    ListItemService, TypeOrmModule
  ]
})
export class ListItemModule {}
