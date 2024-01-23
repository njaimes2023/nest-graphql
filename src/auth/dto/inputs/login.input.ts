
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\dto\inputs\login.input.ts
// --  ==============================================  

import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MinLength } from "class-validator";

@InputType()
export class LoginInput {
    
    @Field( () => String )
    @IsEmail()
    email: string;

    @Field( () => String )
    @MinLength(6)
    password: string;

} 