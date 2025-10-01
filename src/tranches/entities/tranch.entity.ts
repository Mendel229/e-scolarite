import { OptionNiveau } from "src/option-niveaux/entities/option-niveau.entity";
import { Paiement } from "src/paiements/entities/paiement.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tranch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    montantTranche: number;

    @Column()
    dateLimitePaie: Date;

    @ManyToOne(()=>OptionNiveau, (optionNiveau)=>optionNiveau.tranches)
    optionNiveau: OptionNiveau;

    @ManyToOne(()=>Paiement, (paiement)=>paiement.tranches)
    paiement: Paiement;
}
