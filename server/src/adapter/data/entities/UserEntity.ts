import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {RoleEntity} from "./RoleEntity";

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToOne(() => RoleEntity,{
    createForeignKeyConstraints : false
  })
  @JoinColumn()
  role?: RoleEntity;

}