import { OptionNiveau } from "src/option-niveaux/entities/option-niveau.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Niveau {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codeNiv: string;

    @Column()
    libelleNiv: string;

    @OneToMany(()=>OptionNiveau, (optionNiveaux)=>optionNiveaux.niveau)
    optionNiveaux: OptionNiveau;
}
