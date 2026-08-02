import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('desarrolladores')
export class Desarrollador {
    @PrimaryGeneratedColumn()
    id_desarrollador!: number;

    @Column()
    nombre!: string;

    @OneToMany(() => Juego, (juego) => juego.desarrollador)
    juegos!: Juego[];
}

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

    @ManyToOne(() => Desarrollador, (desarrollador) => desarrollador.juegos, { onDelete: 'SET NULL' })
    @JoinColumn({ name: 'id_desarrollador' })
    desarrollador?: Desarrollador;
}