// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\app.module.ts
// --  ==============================================  

import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ListModule } from './list/list.module';
import { ApolloServer } from 'apollo-server-express';

import { ListItemModule } from './list-item/list-item.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

     //-- Bonus - GraphQLModule forRootAsync
      // TODO: configuración básica

      GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
       autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
       playground: false,
       csrfPrevention: false ,
       plugins: [
         ApolloServerPluginLandingPageLocalDefault()
       ],
       //njn 
        context({ req }) { }
      }),


    
      // -- Bonus - GraphQLModule forRootAsync
    // GraphQLModule.forRootAsync({
    //   driver: ApolloDriver,
    //   imports: [ AuthModule ],
    //   inject: [ JwtService ],

    //   useFactory: async( jwtService: JwtService ) => ({
    //     playground: false,
    //     csrfPrevention: false ,
    //     autoSchemaFile: join( process.cwd(), 'src/schema.gql'), 
    //     plugins: [
    //       ApolloServerPluginLandingPageLocalDefault
    //     ],
    //     // context({ req }) { }
    //   })
    // }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      
       //--despliegues DigitalOcean
      ssl: ( process.env.STATE === 'prod' ) 
        ? {
          rejectUnauthorized: false,
          sslmode: 'require',
        } 
        : false as any,

      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
    }),


     ItemsModule,
     UsersModule,
     AuthModule,
     SeedModule,
     CommonModule,
     ListModule,
     ListItemModule,

  ],
  controllers: [],
   providers: [],
})
export class AppModule {
    //--despliegues DigitalOcean
  constructor() {
    console.log('Variables de entorno');
    console.log("STATE",  process.env.STATE );
    console.log("host",  process.env.DB_HOST );
    console.log("port",  +process.env.DB_PORT );
    console.log("username",  process.env.DB_USERNAME );
    console.log("password",  process.env.DB_PASSWORD );
    console.log("database",  process.env.DB_NAME );
  }

}







// GraphQLModule.forRootAsync({
//   driver: ApolloDriver,
//   imports: [ AuthModule ],
//   inject: [ JwtService ],

//   useFactory: async( jwtService: JwtService ) => ({
//     playground: false,
//     autoSchemaFile: join( process.cwd(), 'src/schema.gql'), 
//     plugins: [
//       ApolloServerPluginLandingPageLocalDefault
//     ],

//     context({ req }) {
//       // // console.log (req.headers)
//       // const token = req.headers.authorization?.replace('Bearer ','');
//       // // if ( !token ) throw Error('Token needed');

//       // const payload = jwtService.decode( token );
//       // if ( !payload ) throw Error('Token not valid');
//       // // console.log ({payload})          
//     }
//   })
// }),