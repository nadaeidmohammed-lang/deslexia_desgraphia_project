import { CreateChildDto } from '../dto/create-child.dto';
import { UpdateChildDto } from '../dto';
import { ChildrenService } from '../services/child.service';
export declare class ChildrenController {
    private readonly service;
    constructor(service: ChildrenService);
    create(user: any, dto: CreateChildDto): Promise<{
        message: string;
        data: import("../entities/child.entity").Child;
    }>;
    findAll(user: any): Promise<import("../entities/child.entity").Child[]>;
    update(user: any, id: number, dto: UpdateChildDto): Promise<{
        message: string;
        data: import("../entities/child.entity").Child;
    }>;
    delete(user: any, id: number): Promise<{
        message: string;
    }>;
}
