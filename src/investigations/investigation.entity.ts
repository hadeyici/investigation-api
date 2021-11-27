import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { IsEnum } from 'class-validator';
import { EVENT_TYPE } from './enum';

@Entity('investigations')
@Index(['date', 'eventType', 'deviceName'])
export class Investigation {
  @ObjectIdColumn()
  public id: number;

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
  public tags: any;

  @Column({ type: 'simple-json', nullable: false })
  public data: any;

  @CreateDateColumn({ type: 'timestamptz' })
  public date: Date;

  constructor(pet?: Partial<Investigation>) {
    Object.assign(this, pet);
  }
}
