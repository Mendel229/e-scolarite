import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateEtudiantDto {
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsString()
    prenom: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsDate()
    dateNais: Date;

    @IsString()
    numTel: string;

    @IsNotEmpty()
    @IsNumber()
    optionId: number;

    @IsNotEmpty()
    @IsNumber()
    niveauId: number
}
