import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

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
}