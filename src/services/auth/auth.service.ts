import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { type CreateUserDto } from '../../dto/auth/createUser.dto';
import { type getUserDto } from '../../dto/auth/getUser.dto';
import { PrismaService } from '../../infra/database/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUser() {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          nama: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      if (!users) {
        throw new NotFoundException('No users found');
      }

      return users;
    } catch (error) {
      console.error('Error in getAllUser:', error);

      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getUserById(data: getUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async createUser(data: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: data,
    });

    return user;
  }
}
