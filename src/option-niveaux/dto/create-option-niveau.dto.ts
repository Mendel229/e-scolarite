import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOptionNiveauDto {
    @IsNotEmpty()
    @IsNumber()
    optionId: number;

    @IsNotEmpty()
    @IsNumber()
    niveauId: number;

    @IsNotEmpty()
    @IsNumber()
    montant: number;
}
