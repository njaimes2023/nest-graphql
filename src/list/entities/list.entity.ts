// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\entities\list.entity.ts
// --  ==============================================  
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// import { ListItem } from './../../list-item/entities/list-item.entity';
import { User } from './../../users/entities/user.entity';
import { ListItem } from 'src/list-item/entities/list-item.entity';


@Entity({ name: 'lists' })
@ObjectType()
export class List {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  name: string;

  // -- Relación, index('userId-list-index')
  @ManyToOne( () => User, (user) => user.lists, { nullable: false  , lazy: true  })
  @Index('userId-list-index')
  @Field( () => User )
  user: User;
  
  //-- "5ListItems_Relaciones"
  @OneToMany( () => ListItem, (listItem) => listItem.list, { lazy: true })
 //-- "7Traer información de los items y conteos"
  // @Field( () => [ListItem] )
  listItem: ListItem[];

}
