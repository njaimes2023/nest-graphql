// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\items\dto\inputs\update-items.input.ts
// --  ==============================================  

import { IsUUID } from 'class-validator';
import { CreateItemInput } from './create-items.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateItemsInput extends PartialType(CreateItemInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;
}
