import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Juego } from './juego.entity';

@Injectable()
export class JuegosService {
    constructor(
        @InjectRepository(Juego)
        private juegosRepository: Repository<Juego>,
    ) {}

    findAll(): Promise<Juego[]> {
        return this.juegosRepository.find();
    }

    async findOne(id: number): Promise<Juego> {
        const juego = await this.juegosRepository.findOneBy({ id_juego: id });
        if (!juego) throw new NotFoundException(`Juego con ID ${id} no encontrado`);
        return juego;
    }

    create(juego: Partial<Juego>): Promise<Juego> {
        const nuevoJuego = this.juegosRepository.create(juego);
        return this.juegosRepository.save(nuevoJuego);
    }

    async update(id: number, cambios: Partial<Juego>): Promise<Juego> {
        await this.findOne(id);
        await this.juegosRepository.update(id, cambios);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        const juego = await this.findOne(id);
        await this.juegosRepository.remove(juego);
    }
}