
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\users\entities\user.entity.ts
// --  ==============================================  

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/list/entities/list.entity';

// "ojo importante el entity" 
@Entity  ({name: 'users'})
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  fullName: string;

  @Column({ unique: true })
  @Field( () => String )
  email: string;

  @Column()
  // @Field(() => String)
  password: string;

  @Column({
    type: 'text',
    array: true,
    default: ['user']
  })
  @Field( () => [ String ])
  roles: string[];

  @Column({
    type: 'boolean',
    default: true
  })
  @Field( () => Boolean )
  isActive: boolean;

  //TODO: relaciones 

    //TODO: relaciones
    //--   lazy: true permite realizar el subquery automaticamente
    @ManyToOne( () => User, (user) => user.lastUpdateBy, { nullable: true, lazy: true })
    @JoinColumn({ name: 'lastUpdateBy' })
    @Field( () => User, { nullable: true })
    lastUpdateBy?: User;

    //-- relacion entre Items y usuarios
    //-- un usuario puede tener muchos items
    @OneToMany( () => Item, (item) => item.user, { lazy: true })
    //--para las listas y busquedas
    // @Field( () => [Item] )
    items: Item[];
    
    //manejoListasDetalle
    @OneToMany( () => List, (list) => list.user )
    lists: List[];

}



