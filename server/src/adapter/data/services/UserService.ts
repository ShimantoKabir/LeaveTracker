import {UserEntity} from "../entities/UserEntity";
import {UpdateResult} from "typeorm";

export const US = "US";
export interface UserService {
  getUserByEmail(email: string): Promise<UserEntity>
  getUserId(id: number): Promise<UserEntity>
  save(userEntity: UserEntity): Promise<UserEntity>
  assignRoleToUser(roleId: number, userId: number): Promise<UpdateResult>
}
