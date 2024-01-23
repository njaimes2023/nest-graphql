// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\types\auth-response.types.ts
// --  ==============================================  

import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponse {

    @Field(() => String)
    token: string;

    @Field(() => User)
    user: User;

}