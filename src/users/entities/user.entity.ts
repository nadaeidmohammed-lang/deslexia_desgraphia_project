import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { Conversation } from '../../chat/entities/conversation.entity';
import { Message } from 'src/chat/entities/message.entity';
// import { StoreAdmin } from 'src/store-admins/entities/store-admin.entity';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  location: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  totalOrders: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  favoriteStores: number;

  @Column({
    type: DataType.DECIMAL(3, 2),
    defaultValue: 0,
    allowNull: false,
  })
  rating: number;

  @Column({
    type: DataType.ENUM('user', 'admin', 'store_owner'),
    defaultValue: 'user',
  })
  role: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resetPasswordOtp: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  resetPasswordExpires: Date;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Conversation)
  conversations: Conversation[];

  @HasMany(() => Message)
  messages: Message[];

//   @HasMany(() => StoreAdmin)
//   storeAdmins: StoreAdmin[];
}
