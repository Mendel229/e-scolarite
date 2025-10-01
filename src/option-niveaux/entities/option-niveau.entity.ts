import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Unique, JoinColumn } from "typeorm";
import { Option } from "src/options/entities/option.entity";
import { Niveau } from "src/niveaux/entities/niveau.entity";
import { Tranch } from "src/tranches/entities/tranch.entity";

@Entity()
@Unique(['option', 'niveau'])
export class OptionNiveau {
  @PrimaryGeneratedColumn()
  id: number;

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
}
