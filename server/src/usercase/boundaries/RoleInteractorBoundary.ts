import {RoleRequestModel} from "../domains/RoleRequestModel";
import {RoleResponseModel} from "../domains/RoleResponseModel";
import {IPaginationOptions} from "nestjs-typeorm-paginate";

export const RIB = "RIB";
export interface RoleInteractorBoundary{
  save(roleRequestModel : RoleRequestModel) : Promise<RoleResponseModel>;
  removeById(id: number) : Promise<RoleResponseModel>;
  edit(roleRequestModel: RoleRequestModel) : Promise<RoleResponseModel>
  getById(id: number) : Promise<RoleResponseModel>;
  getAll(options: IPaginationOptions) : Promise<RoleResponseModel>;
}