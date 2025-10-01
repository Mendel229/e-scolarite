import { Etudiant } from "src/etudiants/entities/etudiant.entity";
import { Tranch } from "src/tranches/entities/tranch.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Paiement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    datePaie: Date;

    @Column()
    montantPaie: number;

    @Column()
    mondPaie: string;

    @Column()
    statutPaie: string;

    @Column()
    monPaiyeur: string;

    @OneToMany(()=>Tranch, (tranches)=>tranches.paiement)
    tranches: Tranch[];

    @ManyToOne(()=>Etudiant, (etudiant)=>etudiant.paiements)
    etudiant: Etudiant;
}
