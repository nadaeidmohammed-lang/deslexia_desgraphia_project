import { Controller, Post, Get, Body, UseGuards, Patch, Param } from '@nestjs/common';
import { CreateChildDto } from '../dto/create-child.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ChildrenService } from '../services/child.service';
import { UpdateChildDto } from '../dto';

@ApiTags('Children')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post()
  async create(@CurrentUser() user: any, @Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(user.userId, createChildDto);
  }

  @Get()
  async findAll(@CurrentUser() user: any) {
    return this.childrenService.findAllByParent(user.userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update child profile' })
  async update(
    @CurrentUser() user: any, 
    @Param('id') id: number, 
    @Body() updateChildDto:UpdateChildDto
  ) {
    return this.childrenService.update(id, user.userId, updateChildDto);
  }

  
}