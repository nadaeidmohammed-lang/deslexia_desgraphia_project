import { PaginationDto } from '../../common/dto/pagination.dto';
export declare enum ConversationSortBy {
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
    TITLE = "title"
}
export declare enum SortOrder {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class QueryConversationDto extends PaginationDto {
    status?: string;
    sortBy?: ConversationSortBy;
    sortOrder?: SortOrder;
}
