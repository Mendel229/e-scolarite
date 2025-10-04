import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Option } from "src/options/entities/option.entity";
import { Niveau } from "src/niveaux/entities/niveau.entity";
import { Tranch } from "src/tranches/entities/tranch.entity";
import { Etudiant } from "src/etudiants/entities/etudiant.entity";

@Entity()
export class OptionNiveau {

  @PrimaryColumn()
  optionId: number;

  @PrimaryColumn()
  niveauId: number;

  @ManyToOne(() => Option, (option) => option.optionNiveaux)
  @JoinColumn({ name: 'optionId' })
  option: Option;

  @ManyToOne(() => Niveau, (niveau) => niveau.optionNiveaux)
  @JoinColumn({ name: 'niveauId' })
  niveau: Niveau;

  @Column()
  montant: number;

  @OneToMany(() => Tranch, (tranche) => tranche.optionNiveau, { cascade: true })
  tranches: Tranch[];

  @OneToMany(() => Etudiant, (etudiants) => etudiants.optionNiveau)
  etudiants: Etudiant[];
}
