import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Board, board => board.lists, { onDelete: 'CASCADE' })
  board: Board;
}
