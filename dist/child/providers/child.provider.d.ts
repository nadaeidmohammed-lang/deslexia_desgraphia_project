import { Child } from '../entities/child.entity';
import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';
export declare class ChildProvider {
    private readonly childModel;
    constructor(childModel: typeof Child);
    create(parentId: number, createChildDto: CreateChildDto): Promise<Child>;
    findAllByParent(parentId: number): Promise<Child[]>;
    findOne(id: number, parentId: number): Promise<Child>;
    update(id: number, parentId: number, dto: UpdateChildDto): Promise<[number, Child[]]>;
    remove(id: number, parentId: number): Promise<number>;
}
