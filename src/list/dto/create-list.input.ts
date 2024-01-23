// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Entidad para el manejo de listas Maestro Detalle> < seccion 11>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-7.EntidadManejoListasMaestroDetalle.sql
// --  file    :  src\list\dto\create-list.input.ts
// --  ==============================================  

import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateListInput {
  
  @Field(() => String )
  @IsString()
  @IsNotEmpty()
  name: string;
}
