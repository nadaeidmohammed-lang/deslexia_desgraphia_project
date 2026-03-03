import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

@Table({ tableName: 'children', timestamps: true })
export class Child extends Model<Child> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.INTEGER })
  age: number;

  @Column({ 
    type: DataType.ENUM('dyslexia', 'dysgraphia', 'both'), 
    allowNull: false 
  })
  conditionType: string; 

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  parentId: number;

  @BelongsTo(() => User)
  parent: User;
}