
// -- ==============================================   
// --  proyecto:  < 03-anylist >
// --  seccion :   < Items_usuarios_peticionesAutenticadas .sql > < seccion 8>
// --  file    : sc_2\sc_Node8\2GraphQL\N03.05.graphQL-5.SEED_Data_cargar_PurgarBD
// --  file    :  src\seed\seed.resolver.ts
// --  ==============================================  

import {Mutation, Resolver   } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}

  @Mutation( () => Boolean, { name: 'executeSeed', description: 'Ejecuta la construcción de la base de datos' })
  async executeSeed(): Promise<boolean> {
      return this.seedService.executeSeed();
  }

}
