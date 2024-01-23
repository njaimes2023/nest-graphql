// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\auth.module.ts
// --  ==============================================  

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

import { UsersModule } from 'src/users/users.module';


// import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy ],
  exports: [ JwtStrategy, PassportModule, JwtModule ],  
  imports: [
  // tokebn

  ConfigModule, 

  PassportModule.register({ defaultStrategy: 'jwt' }),

  JwtModule.registerAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
   
    useFactory: ( configService: ConfigService ) => ({ 
           
      // console.log (ConfigService.get('JWT_SECRET') ) ;
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: '4h'
      }
    })
  }),

     UsersModule,
  ]
})
export class AuthModule {}
