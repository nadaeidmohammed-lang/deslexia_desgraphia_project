import { CreateChildDto } from '../dto/create-child.dto';
import { ChildrenService } from '../services/child.service';
import { UpdateChildDto } from '../dto';
export declare class ChildrenController {
    private readonly childrenService;
    constructor(childrenService: ChildrenService);
    create(user: any, createChildDto: CreateChildDto): Promise<import("../entities/child.entity").Child>;
    findAll(user: any): Promise<import("../entities/child.entity").Child[]>;
    update(user: any, id: number, updateChildDto: UpdateChildDto): Promise<import("../entities/child.entity").Child>;
}
