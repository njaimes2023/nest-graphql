
// -- ==============================================   
// --  proyecto: < 03-anylist >
// --  seccion5: < Anylist - GraphQL + Postgres > < seccion 5>
// --  filex:    sc_2\sc_Node8\2GraphQL\N10.04.graphQL-Postgres.sql
// --  file : src\main.ts
// --  ============================================== 


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
      new ValidationPipe({
      whitelist: true,
      // desactivar para poder realizar search 
      // forbidNonWhitelisted: true, 
      })
  );

  //-- await app.listen(3000);
  const PORT = process.env.PORT || 3000;
  await app.listen( PORT );
  console.log(`App running on port ${ PORT }`);

  
}
bootstrap();
