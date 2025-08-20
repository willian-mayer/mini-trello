import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entities/card.entity';
import { List } from '../lists/entities/list.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card) private cardsRepository: Repository<Card>,
    @InjectRepository(List) private listsRepository: Repository<List>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const list = await this.listsRepository.findOneBy({ id: createCardDto.listId });
    if (!list) {
      throw new Error(`List with id ${createCardDto.listId} not found`);
    }
    const card = this.cardsRepository.create({
      title: createCardDto.title,
      description: createCardDto.description,
      list,
    });
    return this.cardsRepository.save(card);
  }

  findAll(): Promise<Card[]> {
    return this.cardsRepository.find({ relations: ['list'] });
  }

  findOne(id: number): Promise<Card | null> {
    return this.cardsRepository.findOne({ where: { id }, relations: ['list'] });
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card | null> {
    await this.cardsRepository.update(id, updateCardDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.cardsRepository.delete(id);
  }

  findByList(listId: number): Promise<Card[]> {
    return this.cardsRepository.find({
      where: { list: { id: listId } },
      relations: ['list'],
    });
  }
}
