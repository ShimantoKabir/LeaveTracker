import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RouteEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  path: string;

  @Column()
  type: number;

  @Column({
    nullable: true
  })
  label!: string;
}