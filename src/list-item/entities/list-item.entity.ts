// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\entities\list-item.entity.ts
// --  ==================================================================  

import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { Item } from './../../items/entities/item.entity';
import { List } from './../../list/entities/list.entity';

@Entity('listItems')
// @Unique('listItem-item', ['list','item'])
@ObjectType()
export class ListItem {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column({ type: 'numeric' })
  @Field( () => Number )
  quantity: number;

  @Column({ type: 'boolean' })
  @Field( () => Boolean )
  completed: boolean;


  // --Relaciones. "5ListItems_Relaciones"
  @ManyToOne( () => List, (list) => list.listItem, { lazy: true })
  @Field( () => List )
  list: List;


   //--"5ListItems_Relaciones" 
  @ManyToOne( () => Item, (item)=> item.listItem, { lazy: true })
  //-- trae el nombre del item
  @Field( () => Item )
  item: Item;
}
