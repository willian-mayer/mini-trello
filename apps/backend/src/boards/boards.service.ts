import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  findOne(id: number): Promise<Board | null> {
  return this.boardsRepository.findOneBy({ id });
}

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.boardsRepository.create(createBoardDto);
    return this.boardsRepository.save(board);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<Board | null> {
  await this.boardsRepository.update(id, updateBoardDto);
  return this.boardsRepository.findOneBy({ id });
}

  async remove(id: number): Promise<void> {
    await this.boardsRepository.delete(id);
  }
}
