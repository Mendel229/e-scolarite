import { Option } from "src/options/entities/option.entity";
import { Paiement } from "src/paiements/entities/paiement.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Etudiant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column()
    dateNais: Date;

    @Column()
    numTel: number

    @ManyToOne(()=>Option, (option)=>option.etudiants)
    option: Option;

    @OneToMany(()=>Paiement, (paiements)=>paiements.etudiant)
    paiements: Paiement[];
}
