// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\users\dto\create-user.input.ts
// --  ==============================================  

import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {

  @Field( () => String )
  @IsEmail()
  email: string;

  @Field( () => String )
  @IsNotEmpty()
  fullName: string;

  @Field( () => String )
  @MinLength(6)
  password: string;

}
