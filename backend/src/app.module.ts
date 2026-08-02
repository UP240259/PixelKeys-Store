import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Juego, Desarrollador } from './juegos/juego.entity';
import { JuegosController } from './juegos/juegos.controller';
import { JuegosService } from './juegos/juegos.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pixelkeys_db',
      entities: [Juego, Desarrollador],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Juego, Desarrollador]),
  ],


  controllers: [JuegosController],
  providers: [JuegosService],
})
export class AppModule {}
