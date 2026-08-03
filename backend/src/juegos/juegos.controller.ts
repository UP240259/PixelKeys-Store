import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { JuegosService } from './juegos.service';
import { Juego } from './juego.entity';

@Controller('juegos')
export class JuegosController {
    constructor(private readonly juegosService: JuegosService) {}

    @Get()
    getAll(): Promise<Juego[]> {
        return this.juegosService.findAll();
    }

    @Get('con-desarrollador')
    obtenerJuegosConDesarrollador() {
        return this.juegosService.obtenerJuegosConDesarrollador();
    }

    @Get(':id/con-desarrollador')
    obtenerJuegoPorIdConDesarrollador(@Param('id', ParseIntPipe) id: number) {
        return this.juegosService.obtenerJuegoPorIdConDesarrollador(id);
    }

    @Get('buscar')
    buscar(@Query('titulo') titulo?: string, @Query('plataforma') plataforma?: string) {
        return this.juegosService.buscarFiltros(titulo, plataforma);
    }

    @Post(':id/comprar')
    comprar(@Param('id', ParseIntPipe) id: number) {
        return this.juegosService.comprarJuego(id);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number): Promise<Juego> {
        return this.juegosService.findOne(id);
    }

    @Post()
    create(@Body() body: Partial<Juego>): Promise<Juego> {
        return this.juegosService.create(body);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: Partial<Juego>): Promise<Juego> {
        return this.juegosService.update(id, body);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.juegosService.remove(id);
    }
}