import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class RoleEntity{

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  roleName: string;
}