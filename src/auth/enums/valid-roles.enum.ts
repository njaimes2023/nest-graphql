// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\enums\valid-roles.enum.ts
// --  ==============================================  

import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
    admin = 'admin', 
    user = 'user', 
    superUser = 'superUser'
}
registerEnumType( ValidRoles, { name: 'ValidRoles', description: 'Roles validos en el proceso ded Analist.' } )

