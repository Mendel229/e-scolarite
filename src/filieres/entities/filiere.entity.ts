import { Option } from "src/options/entities/option.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Filiere {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codeFil:string;

    @Column()
    libelleFil: string;

    @OneToMany(()=>Option, (options)=>options.filiere)
    options: Option[];
}
