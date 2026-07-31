import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('juegos')
export class Juego {
    @PrimaryGeneratedColumn()
    id_juego!: number;

    @Column()
    titulo!: string;

    @Column('text')
    descripcion!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    precio!: number;

    @Column({ default: 0 })
    descuento!: number;

    @Column()
    stock!: number;

    @Column({ length: 500 })
    imagen_url!: string;

    @Column({ default: 'Steam (PC)' })
    plataforma!: string;

    @Column({ nullable: true })
    id_desarrollador?: number;
}