
// -- ==============================================   
// --  proyecto:  < 03-anylist >
// --  seccion :  < Usuarios y enumeraciones - Admin Roles > < seccion 7> 
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-3.Usuarios_enumeraciones.AdminRoles.sql
// --  file    :  src\users\dto\args\roles.arg.ts
// --  ==============================================  
import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';
import { ValidRoles } from '../../../auth/enums/valid-roles.enum';

@ArgsType()
export class ValidRolesArgs {

    @Field( () => [ValidRoles], { nullable: true })
    // @Field( () => [String], { nullable: true })
    @IsArray()
    roles: ValidRoles[] = []
    //-- roles: String[] = []
}

