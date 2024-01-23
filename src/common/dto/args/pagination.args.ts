
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion : < Paginaciones, paginaciones anidadas y filtros > < seccion 10>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-6.PaginacionesAnidadasFiltros.sql
// --  file    :  src\common\dto\args\pagination.args.ts
// --  ==============================================  
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';


@ArgsType()
export class PaginationArgs {

    @Field( () => Int, { nullable: true })
    @IsOptional()
    @Min(0)
    offset: number = 0;

    @Field( () => Int, { nullable: true })
    @IsOptional()
    @Min(1)
    limit: number = 10;
    
}

