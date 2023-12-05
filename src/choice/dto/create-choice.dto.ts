import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChoiceDto {
  @IsNotEmpty()
  @IsString()
  contents: string;
}
