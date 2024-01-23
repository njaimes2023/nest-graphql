// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\list.service.ts
// --  ==============================================  

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { List } from './entities/list.entity';
import { User } from 'src/users/entities/user.entity';

import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Injectable()
export class ListService {


  constructor(
    //-- "2List_CRUD"
    @InjectRepository( List )
    private readonly listsRepository: Repository<List>
  ) {}
  
  //-- "2List_CRUD"
  async create(createListInput: CreateListInput, user: User ): Promise<List> {
    const newList = this.listsRepository.create({ ...createListInput, user })
    return await this.listsRepository.save( newList );
  }

  //-- "2List_CRUD"
  async findAll( user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs ): Promise<List[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    const queryBuilder = this.listsRepository.createQueryBuilder()
      .take( limit )
      .skip( offset )
      .where(`"userId" = :userId`, { userId: user.id });
    if ( search ) {
      queryBuilder.andWhere('LOWER(name) like :name', { name: `%${ search.toLowerCase() }%` });
    }
    return queryBuilder.getMany();
  }

 //-- "2List_CRUD"
  async findOne( id: string, user: User ): Promise<List> {
    const list = await this.listsRepository.findOneBy({ 
      id,
      user: { id: user.id }
    });
    if ( !list ) throw new NotFoundException(`List with id: ${ id } not found`);
    return list;
  }

   //-- "2List_CRUD"
  async update(id: string, updateListInput: UpdateListInput, user: User ): Promise<List> {
    await this.findOne( id, user );
    const list = await this.listsRepository.preload({ ...updateListInput, user });
    if ( !list ) throw new NotFoundException(`List with id: ${ id } not found`);
    return this.listsRepository.save( list );
  }

 //-- "2List_CRUD"
  async remove(id: string, user: User ): Promise<List> {
    const list = await this.findOne( id, user );
    await this.listsRepository.remove( list );
    return { ...list, id };
 }

 async listCountByUser( user: User ): Promise<number> {
   return this.listsRepository.count({
     where: {
       user: { id: user.id }
     }
   });

 }
}



