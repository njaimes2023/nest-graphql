
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\dto\update-list.input.ts
// --  ==============================================  
import { IsUUID } from 'class-validator';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { CreateListInput } from './create-list.input';
@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
}
