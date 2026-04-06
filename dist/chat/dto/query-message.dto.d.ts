import { PaginationDto } from '../../common/dto/pagination.dto';
export declare enum MessageSortBy {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt"
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class QueryMessageDto extends PaginationDto {
    conversationId?: number;
    senderId?: number;
    type?: string;
    isRead?: boolean;
    sortBy?: MessageSortBy;
    sortOrder?: SortOrder;
}
