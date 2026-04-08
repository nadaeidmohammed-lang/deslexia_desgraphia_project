import { ChildProvider } from '../providers/child.provider';
import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';
export declare class ChildrenService {
    private readonly childProvider;
    constructor(childProvider: ChildProvider);
    create(userId: number, dto: CreateChildDto): Promise<{
        message: string;
        data: import("../entities/child.entity").Child;
    }>;
    findAllByParent(parentId: number): Promise<import("../entities/child.entity").Child[]>;
    update(id: number, parentId: number, dto: UpdateChildDto): Promise<{
        message: string;
        data: import("../entities/child.entity").Child;
    }>;
    delete(id: number, parentId: number): Promise<{
        message: string;
    }>;
}
