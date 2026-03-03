import { IsNotEmpty, IsString, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChildDto {
  @ApiProperty({ example: 'Omar' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 8 })
  @IsNumber()
  @Min(4)
  @Max(12)
  age: number;

  @ApiProperty({ enum: ['dyslexia', 'dysgraphia', 'both'] })
  @IsEnum(['dyslexia', 'dysgraphia', 'both'])
  conditionType: string;
}