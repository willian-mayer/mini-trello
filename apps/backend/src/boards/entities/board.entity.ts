import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { List } from '../../lists/entities/list.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => List, list => list.board, { cascade: true })
  lists: List[];
}
