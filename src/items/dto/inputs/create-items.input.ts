// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\items\dto\inputs\create-items.input.ts
// --  ==============================================  



import { InputType, Int, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field( () => String )
  @IsNotEmpty()
  @IsString()
  name: string;

  // @Field( () => Float )
  // @IsPositive()
  // quantity: number;
  
  @Field( () => String, { nullable: true })
  @IsString()
  @IsOptional()
  quantityUnits?: string;

}
