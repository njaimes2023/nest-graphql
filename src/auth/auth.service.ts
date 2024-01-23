
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\auth\auth.service.ts
// --  ==============================================  

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput, SignupInput } from './dto/inputs';

import { AuthResponse } from './types/auth-response.types';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class AuthService { 

    constructor(
        private readonly usersService: UsersService,
         //-- esto se adiciono. Generar nuestro JWT
        private readonly jwtService: JwtService,
    ) {}

      //-- esto se adiciono. Generar nuestro JWT
private getJwtToken( userId: string ) {
    return this.jwtService.sign({ id: userId });
}

async signup( signupInput: SignupInput ): Promise<AuthResponse> { 
    const user = await this.usersService.create( signupInput )
      //-- esto se adiciono. Generar nuestro JWT
    const token = this.getJwtToken( user.id );
    // const token = 'ABC123';
    console.log ({signupInput}); 
    return {token, user}
}

async login( loginInput: LoginInput ): Promise<AuthResponse>{
    const { email, password } = loginInput;
    const user = await this.usersService.findOneByEmail( email );

    // -- verifica la contraseña que exista
    if( !bcrypt.compareSync( password, user.password) ){
        throw new BadRequestException('Email / Password do not match');
    }
  
    const token = this.getJwtToken( user.id );
    //  const token= 'ABC123';  //CUCU
    return {
        token,
        user
    }
}

async validateUser( id: string ): Promise<User> {
    const user = await this.usersService.findOneById( id );
    if( !user.isActive ){
        throw new UnauthorizedException(`User is inactive, talk with an admin`);
    }
    delete user.password;
    return user;
}

revalidateToken( user: User ): AuthResponse {
    const token = this.getJwtToken( user.id );
    return { token, user }
}


}