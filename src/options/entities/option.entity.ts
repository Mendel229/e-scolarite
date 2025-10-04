import { Etudiant } from "src/etudiants/entities/etudiant.entity";
import { Filiere } from "src/filieres/entities/filiere.entity";
import { OptionNiveau } from "src/option-niveaux/entities/option-niveau.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Option {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codeOpt: string;

    @Column()
    libelleOpt: string;

    @OneToMany(()=>OptionNiveau, (optionNiveaux)=> optionNiveaux.option)
    optionNiveaux: OptionNiveau;

    @ManyToOne(()=>Filiere, (filiere)=>filiere.options)
    filiere: Filiere;
}
