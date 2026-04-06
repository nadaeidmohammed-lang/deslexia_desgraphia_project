export declare enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file",
    SYSTEM = "system"
}
export declare class CreateMessageDto {
    content: string;
    type: MessageType;
    metadata?: Record<string, any>;
}
