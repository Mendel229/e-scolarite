import { PartialType } from '@nestjs/mapped-types';
import { CreateTranchDto } from './create-tranch.dto';

export class UpdateTranchDto extends PartialType(CreateTranchDto) {}
