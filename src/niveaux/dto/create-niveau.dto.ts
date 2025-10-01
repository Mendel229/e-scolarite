import { IsNotEmpty, IsString } from "class-validator";

export class CreateNiveauDto {
    @IsNotEmpty()
    @IsString()
    codeNiv: string;

    @IsNotEmpty()
    @IsString()
    libelleNiv: string;
}
