import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTranchDto {
    @IsNotEmpty()
    @IsString()
    nom: string;

    @IsNotEmpty()
    @IsNumber()
    montantTranche: number;

    @IsNotEmpty()
    @IsDate()
    dateLimitePaie: Date;

    @IsNotEmpty()
    @IsNumber()
    optionNiveauId: number;
}
