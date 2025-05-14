import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"

@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    name_location!: string

    @Column({ type: 'float', nullable: true})
    latitude!: number

    @Column({ type: 'float', nullable: true})
    longitude!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date

    @OneToMany(() => MeteoroLogical,(meteorological) => meteorological.location_id)
    meteorological_id!: MeteoroLogical[]
}

@Entity()
export class MeteoroLogical {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({type: 'float', nullable: true})
    temperaturde!: number

    @Column({type: 'float', nullable: true})
    humidity!: number

    @Column({ type: 'float', nullable: true})
    slp!: number

    @Column({ type: 'float', nullable: true})
    rain!: number

    @Column({ type: 'float',  nullable: true})
    windspeed10m!: number

    @Column({ type: 'float', nullable: true})
    winddirdedtion10m!: number

    @Column({ type: 'float', nullable: true})
    lowcloud!: number

    @Column({ type: 'float', nullable: true})
    highcloud!: number

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date

    @ManyToOne(() => Location,(location) => location.meteorological_id)
    location_id!: Location[]
}