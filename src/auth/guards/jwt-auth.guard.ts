// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\guards\jwt-auth.guard.ts
// --  ==============================================  

import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {

    //! Override
    getRequest( context: ExecutionContext ) {

        const ctx = GqlExecutionContext.create( context );
        const request = ctx.getContext().req;

        return request;

    }

}