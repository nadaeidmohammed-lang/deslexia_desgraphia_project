import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Child } from '../entities/child.entity';
import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';

@Injectable()
export class ChildProvider {
  constructor(
    @InjectModel(Child)
    private readonly childModel: typeof Child,
  ) {}

  async create(parentId: number, createChildDto: CreateChildDto): Promise<Child> {
    return this.childModel.create({
      ...createChildDto,
      parentId,
    });
  }

  async findAllByParent(parentId: number): Promise<Child[]> {
    return this.childModel.findAll({
      where: { parentId },
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: number, parentId: number): Promise<Child> {
    return this.childModel.findOne({
      where: { id, parentId },
    });
  }
  async update(id: number, parentId: number, dto: UpdateChildDto): Promise<[number, Child[]]> {
    return this.childModel.update(dto, {
      where: { id, parentId },
      returning: true, 
    });
  }

  async remove(id: number, parentId: number): Promise<number> {
    return this.childModel.destroy({
      where: { id, parentId },
    });
  }
}