
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    : src\users\users.resolver.ts
// --  ==============================================  

import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { ValidRolesArgs } from './dto/args/roles.arg';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/entities/item.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { List } from 'src/list/entities/list.entity';
import { ListService } from 'src/list/list.service';


@Resolver(() => User)
//protegerlas rutas
@UseGuards( JwtAuthGuard )
export class UsersResolver {
  constructor(private readonly usersService: UsersService,
    private readonly itemsService: ItemsService,
     //--"3List_CRUD" 
    private readonly listsService: ListService
    ) {}


  @Query(() => [User], { name: 'users' })
   findAll(
      @Args() validRoles: ValidRolesArgs,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser]) user: User
    // @CurrentUser() user: User
  ):Promise<User[]> {
    // const users = await this.usersService.findAll( validRoles.roles );
    // console.log(user);
    return this.usersService.findAll( validRoles.roles );
    // --return this.usersService.findAll(  );
  }

  

  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => ID }) id: string) : Promise <User> {
  //   return this.usersService.findOne(id);
  // }

  @Query(() => User, { name: 'user' })
  findOne( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.superUser ]) user: User
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }


  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin ]) user: User
  ): Promise<User> {
    // return this.usersService.update(updateUserInput.id, updateUserInput);
    return this.usersService.update(updateUserInput.id, updateUserInput, user );
  }


  @Mutation(() => User, { name: 'blockUser' })
  blockUser( 
    @Args('id', { type: () => ID }, ParseUUIDPipe ) id: string,
    @CurrentUser([ ValidRoles.admin ]) user: User
  ): Promise<User> {
    return this.usersService.block(id, user );
  }
  

  @ResolveField( () => Int, { name: 'itemCount' })
  async itemCount(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User  //trae la infromacion del padre
  ): Promise<number> {
    return this.itemsService.itemCountByUser( user )
  }

  @ResolveField( () => [Item], { name: 'items' })
  async getItemsByUser(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<Item[]> {
    return this.itemsService.findAll( user, paginationArgs, searchArgs );
  }

    //--"3List_CRUD" 
  @ResolveField( () => Int, { name: 'listCount' })
  async listCount(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User
  ): Promise<number> {
    return this.listsService.listCountByUser( user );
  }

  //--"3List_CRUD" 
  @ResolveField( () => [List], { name: 'lists' })
  async getListsByUser(
    @CurrentUser([ ValidRoles.admin ]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs,
  ): Promise<List[]> {
    return this.listsService.findAll( user, paginationArgs, searchArgs );
  }

  
  
}
