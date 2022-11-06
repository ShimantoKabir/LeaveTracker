import {RoleEntity} from "../entities/RoleEntity";
import {UpdateResult} from "typeorm";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";

export const RS = "RS";
export interface RoleService{
  create(roleEntity: RoleEntity): Promise<RoleEntity>;
  update(roleEntity: RoleEntity): Promise<UpdateResult>;
  delete(id: number): Promise<boolean>;
  read(id: number): Promise<RoleEntity>;
  readAll(options: IPaginationOptions): Promise<Pagination<RoleEntity>>;
}