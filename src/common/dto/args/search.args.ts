// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion : < Paginaciones, paginaciones anidadas y filtros > < seccion 10>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-6.PaginacionesAnidadasFiltros.sql
// --  file    :  src\common\dto\args\search.args.ts
// --  ==============================================  
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class SearchArgs {

    @Field( ()=> String, { nullable: true })
    @IsOptional()
    @IsString()
    search?: string;
}

