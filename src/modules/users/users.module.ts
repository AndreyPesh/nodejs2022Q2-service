import { Module } from '@nestjs/common';
import { UserModel } from 'src/modules/users/model/user-model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserModel],
})
export class UsersModule {}
