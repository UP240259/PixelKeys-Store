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

    async obtenerJuegosConDesarrollador(): Promise<Juego[]> {
        return await this.juegosRepository.find({
            relations: { desarrollador: true },
        });
    }

    async obtenerJuegoPorIdConDesarrollador(id_juego: number): Promise<Juego | null> {
        return await this.juegosRepository.findOne({
            where: { id_juego },
            relations: { desarrollador: true },
        });
    }

    // Método para buscar juegos por título y/o plataforma
    async buscarFiltros(titulo?: string, plataforma?: string): Promise<Juego[]> {
        const query = this.juegosRepository.createQueryBuilder('juego');

        if (titulo) {
            query.andWhere('LOWER(juego.titulo) LIKE LOWER(:titulo)', { titulo: `%${titulo}%` });
        }

        if (plataforma) {
            query.andWhere('juego.plataforma = :plataforma', { plataforma });
        }

        return await query.getMany();
    }

//Simular compra: reducir stock y generar key
    async comprarJuego(id_juego: number): Promise<{ mensaje: string; licenciaKey: string; juego: Juego }> {
        const juego = await this.juegosRepository.findOneBy({ id_juego });

        if (!juego) {
            throw new Error('El juego no existe');
        }

        if (juego.stock <= 0) {
            throw new Error('Sin stock disponible');
        }

        juego.stock -= 1;
        await this.juegosRepository.save(juego);

  // Generar clave de activación aleatoria (Formato: XXXX-XXXX-XXXX)
        const generateSegment = () => Math.random().toString(36).substring(2, 6).toUpperCase();
        const licenciaKey = `PK-${generateSegment()}-${generateSegment()}-${generateSegment()}`;

        return {
            mensaje: "¡Compra procesada con éxito!",
            licenciaKey,
            juego,
        };
    }
}