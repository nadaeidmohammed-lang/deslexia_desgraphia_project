import { IsInt, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConversationDto {
  @ApiProperty({
    description: 'User ID for the conversation',
    example: 1,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    description: 'Store ID for the conversation',
    example: 1,
  })
  @IsInt()
  storeId: number;

  @ApiProperty({
    description: 'Conversation title',
    example: 'Inquiry about menu',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Conversation status',
    enum: ['active', 'closed', 'archived'],
    example: 'active',
    required: false,
    default: 'active',
  })
  @IsEnum(['active', 'closed', 'archived'])
  @IsOptional()
  status?: string;
}
