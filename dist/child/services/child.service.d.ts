import { Child } from '../entities/child.entity';
import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';
export declare class ChildrenService {
    private childModel;
    constructor(childModel: typeof Child);
    create(parentId: number, dto: CreateChildDto): Promise<Child>;
    findAllByParent(parentId: number): Promise<Child[]>;
    update(id: number, parentId: number, dto: UpdateChildDto): Promise<Child>;
}
