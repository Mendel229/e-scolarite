import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    codeOpt: string;

    @IsNotEmpty()
    @IsString()
    libelleOpt: string;

    @IsNotEmpty()
    @IsNumber()
    filiereId: number;
}
