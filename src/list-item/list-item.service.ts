// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\list-item.service.ts
// --  ==================================================================  


import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListItem } from './entities/list-item.entity';
import { Repository } from 'typeorm';
import { List } from 'src/list/entities/list.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Injectable()
export class ListItemService {
  
  constructor(
    @InjectRepository( ListItem )
    private readonly listItemsRepository: Repository<ListItem>,
  ) {}

  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const { itemId, listId, ...rest } = createListItemInput;
        const newListItem = this.listItemsRepository.create({
      ...rest,
      item: { id: itemId },
      list: { id: listId }
    });

     await this.listItemsRepository.save( newListItem );
      return this.findOne( newListItem.id );
  }


  // findAll(): Promise<ListItem[]>   {
  //   return this.listItemsRepository.find();
  // }


  //--  "7Traer información de los items y conteos"
  async findAll( list: List, paginationArgs: PaginationArgs, searchArgs: SearchArgs ): Promise<ListItem[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    const queryBuilder = this.listItemsRepository.createQueryBuilder('listItem') // <-- Nombre para las relaciones
      .innerJoin('listItem.item','item') // <--- Lo añadí después, fue un problema que no grabé
      .take( limit )
      .skip( offset )
      .where(`"listId" = :listId`, { listId: list.id });

    if ( search ) {
      queryBuilder.andWhere('LOWER(item.name) like :name', { name: `%${ search.toLowerCase() }%` });
    }
    return queryBuilder.getMany();
  }

  //-- ."8Filtrar por lista, paginar y conteo"
  async countListItemsByList( list: List ): Promise<number> {
    return this.listItemsRepository.count({
      where: { list: { id: list.id }}
    });
  }
  //-- 9."9Buscar inLilstImem Por ID"
  async findOne(id: string): Promise<ListItem> {
    const listItem = await this.listItemsRepository.findOneBy({ id });
    if ( !listItem ) throw new NotFoundException(`List item with id ${ id } not found`);
    return listItem;
  }

  // update(id: number, updateListItemInput: UpdateListItemInput) {
  //   return `This action updates a #${id} listItem`;
  // }

  //-- 10."10Actualizar un LilstImem Por ID"
  async update(
    id: string, updateListItemInput: UpdateListItemInput
  ): Promise<ListItem> {



      //-- 10."10Actualizar un LilstImem Por ID"
      //-- const { listId, itemId, ...rest } = updateListItemInput;
      //--   const listIem = await this.listItemsRepository.preload( {
      //--         ...rest  , 
      //--         list: { id: listId },
      //--        item: { id: itemId }
      //--       } )
      //--  if ( !listIem) throw new Error ('Iem no encontrato');
      //--   return await this.listItemsRepository.save( listIem );


    //-- "11Actualizar usando query builder"
      const { listId, itemId, ...rest } = updateListItemInput;
        const queryBuilder = this.listItemsRepository.createQueryBuilder()
      .update()
      .set( rest )
      .where('id = :id', { id });

    if ( listId ) queryBuilder.set({ list: { id: listId } });
    if ( itemId ) queryBuilder.set({ item: { id: itemId } });
    await queryBuilder.execute();
    return this.findOne( id );
  }


  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
}
