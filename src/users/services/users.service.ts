import { Injectable } from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userProvider: UserProvider) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userProvider.create(createUserDto);
  }

  async findAll(queryDto: any = {}) {
    return this.userProvider.findAll(queryDto);
  }

  async findOne(id: number): Promise<User> {
    return this.userProvider.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userProvider.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateData = { ...updateUserDto };

    // Hash password if it's being updated
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const [affectedCount, updatedUsers] = await this.userProvider.update(
      id,
      updateData,
    );
    return updatedUsers[0] || this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userProvider.remove(id);
  }

  async verifyEmail(id: number): Promise<void> {
    await this.userProvider.verifyEmail(id);
  }

  async updateLastLogin(id: number): Promise<void> {
    await this.userProvider.updateLastLogin(id);
  }

  async count(): Promise<number> {
    return this.userProvider.count();
  }

  async countByRole(role: string): Promise<number> {
    return this.userProvider.countByRole(role);
  }

  async findActiveUsers(): Promise<User[]> {
    return this.userProvider.findActiveUsers();
  }
}
