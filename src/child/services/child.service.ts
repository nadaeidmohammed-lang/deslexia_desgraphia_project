import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Child } from '../entities/child.entity';
import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';

@Injectable()
export class ChildrenService {
  constructor(@InjectModel(Child) private childModel: typeof Child) {}

  async create(parentId: number, dto: CreateChildDto) {
    return this.childModel.create({ ...dto, parentId });
  }

  async findAllByParent(parentId: number) {
    return this.childModel.findAll({ where: { parentId } });
  }

  async update(id: number, parentId: number, dto: UpdateChildDto) {
    const child = await this.childModel.findOne({ where: { id, parentId } });
    
    if (!child) {
      throw new NotFoundException('Child profile not found or access denied');
    }

    return child.update(dto);
  }
}