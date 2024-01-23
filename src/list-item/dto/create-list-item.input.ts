// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\dto\create-list-item.input.ts
// --  ==================================================================  

import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateListItemInput {


  @Field( () => Number, { nullable: true })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity: number = 0;

  @Field( () => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  completed: boolean = false;

  @Field( () => ID )
  @IsUUID()
  listId: string;

  @Field( () => ID )
  @IsUUID()
  itemId: string;
}


