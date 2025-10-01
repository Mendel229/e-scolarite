import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsModule } from './options/options.module';
import { EtudiantsModule } from './etudiants/etudiants.module';
import { FilieresModule } from './filieres/filieres.module';
import { NiveauxModule } from './niveaux/niveaux.module';
import { TranchesModule } from './tranches/tranches.module';
import { OptionNiveauxModule } from './option-niveaux/option-niveaux.module';
import { PaiementsModule } from './paiements/paiements.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'eScolarite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    })
    ,EtudiantsModule, OptionsModule, FilieresModule, NiveauxModule, TranchesModule, OptionNiveauxModule, PaiementsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
