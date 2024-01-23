// -- ===================================================================  
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list-item\dto\update-list-item.input.ts
// --  ==================================================================  
import { CreateListItemInput } from './create-list-item.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateListItemInput extends PartialType(CreateListItemInput) {
  @Field(() => ID )
  @IsUUID()
  id: string;

}
