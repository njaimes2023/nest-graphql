// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\list.resolver.ts
// --  ==============================================  
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';

import { ListService } from './list.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { User } from 'src/users/entities/user.entity';
import { List } from './entities/list.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { ListItem } from 'src/list-item/entities/list-item.entity';
import { ListItemService } from 'src/list-item/list-item.service';


@Resolver(() => List)
@UseGuards( JwtAuthGuard )  //--"2List_CRUD"
export class ListResolver {

  constructor(private readonly listsService: ListService,
    //-- "7Traer información de los items y conteos"
   private readonly listItemsService: ListItemService
    ) {}

    //--"2List_CRUD"
    @Mutation(() => List)
    async createList(
      @Args('createListInput') createListInput: CreateListInput,
      @CurrentUser() user: User
    ):Promise<List> {
      console.log (user); 
      return this.listsService.create( createListInput, user );
    }

     //--"2List_CRUD"
    @Query(() => [List], { name: 'lists' })
    async findAll(
      @CurrentUser() user: User,
      @Args() paginationArgs: PaginationArgs,
      @Args() searchArgs: SearchArgs,
    ):Promise<List[]> {
      return this.listsService.findAll(user, paginationArgs, searchArgs );
    }

         //--"2List_CRUD"
  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.findOne( id, user );
  }

  //--"2List_CRUD"
  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @CurrentUser() user: User
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user );
  }

  //--"2List_CRUD"
  @Mutation(() => List)
  removeList(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ) {
    return this.listsService.remove( id, user );
  }

  //-- "8Filtrar por lista, paginar y conteo"
  @ResolveField( () => [ListItem], { name: 'items' } )
  async getListItems(
    //-- quien es el padre
    @Parent() list: List,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<ListItem[]> {
    // return this.listItemsService.findAll();
    return this.listItemsService.findAll( list, paginationArgs, searchArgs );
  }

    //-- ."8Filtrar por lista, paginar y conteo"
    @ResolveField( () => Number, { name: 'totalItems' } )
  async countListItemsByList(
    @Parent() list: List,
  ): Promise<number> {
    return this.listItemsService.countListItemsByList( list );
  }


}
