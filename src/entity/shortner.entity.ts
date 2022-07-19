import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Shortner {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  url: string;

  @Column()
  shortUrl: string;

  @Column({ type: 'int', default: 0 })
  clicks: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
