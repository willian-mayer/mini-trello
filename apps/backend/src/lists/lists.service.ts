import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from './entities/list.entity';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Board } from '../boards/entities/board.entity';

@Injectable()
export class ListsService {
  constructor(
    @InjectRepository(List) private listsRepository: Repository<List>,
    @InjectRepository(Board) private boardsRepository: Repository<Board>,
  ) {}

async create(createListDto: CreateListDto): Promise<List> {
  const board = await this.boardsRepository.findOneBy({ id: createListDto.boardId });
  if (!board) {
    throw new Error(`Board with id ${createListDto.boardId} not found`);
  }

  const list = this.listsRepository.create({ title: createListDto.title, board });
  return this.listsRepository.save(list);
}

  findAll(): Promise<List[]> {
    return this.listsRepository.find({ relations: ['board'] });
  }

  findOne(id: number): Promise<List | null> {
    return this.listsRepository.findOne({ where: { id }, relations: ['board'] });
  }

  async update(id: number, updateListDto: UpdateListDto): Promise<List | null> {
    await this.listsRepository.update(id, updateListDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.listsRepository.delete(id);
  }

  findByBoard(boardId: number): Promise<List[]> {
    return this.listsRepository.find({
      where: { board: { id: boardId } },
      relations: ['board'],
    });
  }
}
