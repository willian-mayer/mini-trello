import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card } from './entities/card.entity';
import { List } from '../lists/entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, List])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
