import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FindManyClientsDto {
  @IsOptional()
  @Transform((value) => Number(value.value))
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Transform((value) => Number(value.value))
  @IsInt()
  @Min(1)
  perPage = 12;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  clientName?: string;
}
