import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { Board } from '../boards/entities/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([List, Board])],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
