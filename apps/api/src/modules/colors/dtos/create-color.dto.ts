import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsHexColor()
  hex: string;
}
