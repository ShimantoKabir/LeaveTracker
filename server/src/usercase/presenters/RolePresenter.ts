import {RoleEntity} from "../../adapter/data/entities/RoleEntity";
import {RoleResponseModel} from "../domains/RoleResponseModel";
import {Pagination} from "nestjs-typeorm-paginate";

export const RP = "RP";
export interface RolePresenter{
  buildGetOrSaveOrUpdateResponse(roleEntity: string|RoleEntity): Promise<RoleResponseModel>
  buildRemoveResponse(isRemoved: boolean): Promise<RoleResponseModel>;
  buildGetAllResponse(pagination: Pagination<RoleEntity> | string) : Promise<RoleResponseModel>;
}