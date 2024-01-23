// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\auth.resolver.ts
// --  ==============================================  

import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { LoginInput, SignupInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.types';
//
// import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { ValidRoles } from './enums/valid-roles.enum';
// import { ValidRoles } from './enums/valid-roles.enum';



@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation( () => AuthResponse, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<AuthResponse>{
    return this.authService.signup(signupInput)
  }

  @Mutation( () => AuthResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<AuthResponse>{
    return this.authService.login(loginInput)
  }

  @Query( () => AuthResponse, { name: 'revalidate' })
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    // @CurrentUser( /**[ ValidRoles.admin ]*/ ) user: User
    @CurrentUser(  [ValidRoles.admin] ) user: User
  ): AuthResponse{
    // console.log ('CurrentUser ', user );
    return this.authService.revalidateToken( user );
   }
  

  
}
