import {
  Controller,
  Get,
  Param,
  NotFoundException,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiConsumes } from '@nestjs/swagger';

import { CreateUserDto } from '../../dto/auth/createUser.dto';
import { getUserDto } from '../../dto/auth/getUser.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Get all user',
  })
  @Get('user')
  async getAllUser() {
    const users = await this.authService.getAllUser();

    return {
      status: 'success',
      data: users,
    };
  }

  @ApiOkResponse({
    description: 'Get user by id',
  })
  @Get('user/:id')
  async getUserById(@Param() data: getUserDto) {
    try {
      const user = await this.authService.getUserById(data);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          status: 'error',
          message: error.message,
        };
      }

      console.error('Error in getUserById:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOkResponse({
    description: 'Create user',
  })
  @Post('register')
  async createUser(@Body(ValidationPipe) data: CreateUserDto) {
    try {
      const user = await this.authService.createUser(data);

      return {
        status: 'success',
        data: user,
      };
    } catch (error) {
      console.error('Error in createUser:', error);

      return {
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
