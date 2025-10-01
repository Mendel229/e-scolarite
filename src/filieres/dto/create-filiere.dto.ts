import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFiliereDto {
    @IsNotEmpty()
    @IsString()
    codeFil:string;

    @IsNotEmpty()
    @IsString()
    libelleFil: string;
    
}
