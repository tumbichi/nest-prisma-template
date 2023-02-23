import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import PrismaClient from 'Base/config/prisma/PrismaClient';

import Role from 'Authentication/domain/models/Role';
import User from 'Authentication/domain/models/User';
import UserRepository from 'Authentication/application/repository/UserRepository';

import UserEntity from '../entity/UserEntity';
import RoleEntity from '../entity/RoleEntity';

@Injectable()
export default class UserDataProvider implements UserRepository {
  client: Prisma.UserDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;

  constructor(prisma: PrismaClient) {
    this.client = prisma.user;
  }

  async insert(user: User): Promise<User> {
    const userEntity = await this.client.create({
      data: {
        name: user.name,
        email: user.email,
        role: Role[user.role],
      },
    });

    return this.mapEntityToDomain(userEntity);
  }

  async findById(id: number): Promise<User | null> {
    const userEntity = await this.client.findUnique({ where: { id } });

    return this.mapEntityToDomain(userEntity);
  }

  async findAll(): Promise<User[]> {
    const users = await this.client.findMany();

    return users.map((userEntity) => this.mapEntityToDomain(userEntity));
  }

  async delete(id: number): Promise<User> {
    const userEntity = await this.client.delete({ where: { id } });

    return this.mapEntityToDomain(userEntity);
  }

  async update(id: number, partialUser: Partial<User>): Promise<User> {
    const userEntity = await this.client.update({
      data: {
        name: partialUser.name,
        email: partialUser.email,
        role: this.mapDomainRoleToEntity(partialUser.role),
      },
      where: {
        id,
      },
    });

    return this.mapEntityToDomain(userEntity);
  }

  private mapEntityToDomain(userEntity: UserEntity): User {
    return new User(
      userEntity.name,
      userEntity.email,
      Role[userEntity.role],
      userEntity.id,
    );
  }

  private mapDomainRoleToEntity(role: Role): RoleEntity | undefined {
    return Role[role] ?? undefined;
  }
}
