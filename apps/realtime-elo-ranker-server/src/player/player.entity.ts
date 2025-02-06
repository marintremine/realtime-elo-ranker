import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  playerId: number;

  @Column()
  id: string;

  @Column()
  rank: number;
}