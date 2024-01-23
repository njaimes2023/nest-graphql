
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion :  < Anylist -autenticacion y autorizacion > < seccion 5>
// --  file    :  sc_2\sc_Node8\2GraphQL\N03.05.graphQL-AutenticacionYautorizacion.sql
// --  file    :  src\users\users.service.ts
// --  ==============================================  

import * as bcrypt from 'bcrypt';

import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupInput } from 'src/auth/dto/inputs';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Injectable()
export class UsersService {



  private logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){}

  async create( signupInput: SignupInput ): Promise<User> {
    try {

      //-- const newUser = this.usersRepository.create(signupInput);
      const newUser = this.usersRepository.create(   { 
        ...signupInput,
        password: bcrypt.hashSync( signupInput.password, 10 )
       });

      return await this.usersRepository.save( newUser ); 

    } catch (error) {
      // console.error (error);
      this.handleDBErrors(error);
    }
  }


  async findAll( roles: ValidRoles[] ): Promise<User[]> {
   //-- async findAll(): Promise<User[]> {
   //-- return this.usersRepository.find();

      if ( roles.length === 0 ) 
      return this.usersRepository.find(); //{
        // TODO: No es necesario porque tenemos "lazy en entity" la propiedad lastUpdateBy
        //-- relations: {
        //--   lastUpdateBy: true
        //-- }
      // });
      
    // --esto no ??? tenemos roles ['admin','superUser']
    return this.usersRepository.createQueryBuilder()
      .andWhere('ARRAY[roles] && ARRAY[:...roles]')
      .setParameter('roles', roles )
      .getMany();
 
  }

  // --login usuario
  async findOneByEmail( email: string ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email })
    } catch (error) {
     
      throw new NotFoundException(`${ email } not found`);
      // this.handleDBErrors({
      //   code: 'error-001',
      //   detail: `${ email } not found`
      // });
    }
  }

  async findOneById( id: string ): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new NotFoundException(`${ id } not found`);
    }
  }

  
  findOne(id: string): Promise <User>  {
    throw new  Error ( `Not imple,mented #${id} user`) ;
  }



  async update(
    id: string, 
    updateUserInput: UpdateUserInput,
    updateBy: User
  ): Promise<User> {
    try {
      const user = await this.usersRepository.preload({
        ...updateUserInput,
        id
      });
      user.lastUpdateBy = updateBy;
      return await this.usersRepository.save( user );
    } catch (error) {
      this.handleDBErrors( error );
    }
  }

  
  async block( id: string, adminUser: User ): Promise<User> {
    const userToBlock = await this.findOneById( id );
    userToBlock.isActive = false;
    //usuario que actualizo
    userToBlock.lastUpdateBy = adminUser;
    return await this.usersRepository.save( userToBlock );
  }


  private handleDBErrors( error: any ): never{

    if( error.code === '23505' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }
    if( error.code == 'error-001' ){
      throw new BadRequestException(error.detail.replace('Key', ''));
    }
    this.logger.error( error );
    throw new InternalServerErrorException('Please check server logs');
  }
  
}
