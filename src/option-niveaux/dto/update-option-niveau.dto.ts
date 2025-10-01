import { PartialType } from '@nestjs/mapped-types';
import { CreateOptionNiveauDto } from './create-option-niveau.dto';

export class UpdateOptionNiveauDto extends PartialType(CreateOptionNiveauDto) {}
