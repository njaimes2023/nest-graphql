// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\list-item.resolver.ts
// --  ==================================================================  

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards, ParseUUIDPipe } from '@nestjs/common';

import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';

import { ListItemService } from './list-item.service';
import { ListItem } from './entities/list-item.entity';

import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';

@Resolver(() => ListItem)
@UseGuards( JwtAuthGuard )
export class ListItemResolver {
  constructor(private readonly listItemService: ListItemService) {}

  @Mutation(() => ListItem)
  createListItem(
    @Args('createListItemInput') createListItemInput: CreateListItemInput ,
        //! Todo pueden pedir el usuario para validarlo
  ): Promise<ListItem> {
    return this.listItemService.create(createListItemInput);
   
  }
 
  //njn 
  // @Query(() => [ListItem], { name: 'listItem' })
  // findAll() {
  //   return this.listItemService.findAll();
  // }

  // @Query(() => ListItem, { name: 'listItem' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.findOne(id);
  // }

  //-- 9."9Buscar inLilstImem Por ID"
  @Query( () => ListItem, { name: 'listItem' })
  async findOne(
    @Args('id', { type: () => String }, ParseUUIDPipe ) id: string 
  ): Promise<ListItem> {
    return this.listItemService.findOne(id);
  }

  //-- 10."10Actualizar un LilstImem Por ID"
  @Mutation(() => ListItem)
  async updateListItem(
    @Args('updateListItemInput') updateListItemInput: UpdateListItemInput
  ): Promise<ListItem> {
    return this.listItemService.update( updateListItemInput.id, updateListItemInput );
  }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemService.remove(id);
  // }
}
