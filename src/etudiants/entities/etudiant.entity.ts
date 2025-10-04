import { OptionNiveau } from "src/option-niveaux/entities/option-niveau.entity";
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

    @Column({ type: 'varchar', length: 20 })
    numTel: string;

    @OneToMany(()=>Paiement, (paiements)=>paiements.etudiant)
    paiements: Paiement[];

    @ManyToOne(() => OptionNiveau, (optionNiveau) => optionNiveau.etudiants)
    optionNiveau: OptionNiveau;
}
