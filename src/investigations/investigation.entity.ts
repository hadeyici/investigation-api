import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { EVENT_TYPE } from './enum';

@Entity('investigations')
export class Investigation {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ nullable: true })
  public userName: string;

  @Column({
    type: 'enum',
    enum: EVENT_TYPE,
    nullable: false,
  })
  @IsEnum(EVENT_TYPE)
  public eventType: EVENT_TYPE;

  @Column({ nullable: false })
  public deviceName: string;

  @Column({ nullable: false })
  public tags: string[];

  @Column({ nullable: false })
  public data: object[];

  @CreateDateColumn({ type: 'timestamptz' })
  public date: Date;

  constructor(pet?: Partial<Investigation>) {
    Object.assign(this, pet);
  }
}
