
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\items\items.resolver.ts
// --  ==============================================  

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput , UpdateItemsInput } from './dto/inputs';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';



@Resolver(() => Item)
@UseGuards( JwtAuthGuard )
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item, { name: 'createItems' })
  async createItems(
      @Args('CreateItemInput') CreateItemInput: CreateItemInput, 
      @CurrentUser() user: User
      ): Promise<Item>  {
    return this.itemsService.create(CreateItemInput, user) ;
  }

 
  // @Query(() => [Item], { name: 'itemAll' })
  // findAll() {
  //   return this.itemsService.findAll();
  // }

  @Query(() => [Item], { name: 'itemAll' })
  async findAll(
    @CurrentUser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    console.log (paginationArgs, searchArgs); 
    // return this.itemsService.findAll( user );
    return this.itemsService.findAll( user, paginationArgs, searchArgs );
    // return this.itemsService.findAll( user, paginationArgs  );
  }




  // @Query(() => Item, { name: 'itemBy' })
  // async findOne(
  //   @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string
  // ): Promise<Item> {
  //   return this.itemsService.findOne(id);
  // }


  @Query(() => Item, { name: 'itemBy' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.findOne(id, user );
  }


  // @Mutation(() => Item)
  // updateItem(
  //   @Args('updateItemInput') updateItemInput: UpdateItemsInput
  // ):Promise<Item> {
  //   return this.itemsService.update( updateItemInput.id, updateItemInput );
  // }

  @Mutation(() => Item, { name: 'updateItem' })
   updateItem(
    @Args('updateItemInput') updateItemInput: UpdateItemsInput,
    @CurrentUser() user: User
  ):Promise<Item> {
    return this.itemsService.update( updateItemInput.id, updateItemInput, user );
  }
 
  // @Mutation(() => Item)
  // removeItem(
  //   @Args('id', { type: () => ID }) id: string
  // ): Promise<Item> {
  //   return this.itemsService.remove(id);
  // }


  @Mutation(() => Item)
  removeItem(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User
  ): Promise<Item> {
    return this.itemsService.remove(id, user);
  }


}
