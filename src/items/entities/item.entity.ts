// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\items\entities\items.entity.ts
// --  ==============================================  

import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';

@Entity({ name: 'items' })
@ObjectType()
export class Item {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  name: string;

  // @Column()
  // @Field( () => Float )
  // quantity: number;

  // @Column({ nullable: true })
  // @Field( () => String, { nullable: true } )
  // quantityUnits?: string; // g, ml, kg, tsp


  @Column({ nullable: true })
  @Field( () => String, { nullable: true } )
  quantityUnits?: string; // g, ml, kg, tsp

  // stores
  // user
  //-- relacion entre Items y usuarios
  //- muchos items pertenecen a un usuario
  @ManyToOne( () => User, (user) => user.items, { nullable: false, lazy: true })
  @Index('userId-index')
  @Field( () => User )
  user: User;

  //--"5ListItems_Relaciones" 
  @OneToMany(() => ListItem, (listItem) => listItem.item, { lazy: true })
  @Field( () => [ListItem] )
  listItem: ListItem[]
     
}
