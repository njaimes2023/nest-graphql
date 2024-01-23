// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\interfaces\jwt-payload.interface.ts
// --  ==============================================  

export interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
} 