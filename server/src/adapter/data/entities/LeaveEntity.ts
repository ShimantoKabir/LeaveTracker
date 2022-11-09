import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class LeaveEntity{

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  leaveName: string;

  @Column()
  quantity: number;
}