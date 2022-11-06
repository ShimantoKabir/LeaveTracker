import {RoleInteractorBoundary} from "./boundaries/RoleInteractorBoundary";
import {RoleResponseModel} from "./domains/RoleResponseModel";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {RoleRequestModel} from "./domains/RoleRequestModel";
import {RoleService, RS} from "../adapter/data/services/RoleService";
import {Inject, Injectable} from "@nestjs/common";
import {RolePresenter, RP} from "./presenters/RolePresenter";
import {RoleEntity} from "../adapter/data/entities/RoleEntity";
import {IOMsg} from "../common/IOMsg";

@Injectable()
export class RoleInteractor implements RoleInteractorBoundary{

  constructor(
    @Inject(RS)
    private readonly roleService: RoleService,
    @Inject(RP)
    private readonly rolePresenter: RolePresenter
  ) {
  }

  async edit(roleRequestModel: RoleRequestModel): Promise<RoleResponseModel> {
    let response : RoleEntity | string;
    try {
      const updateResult = await this.roleService.update(roleRequestModel);
      if (updateResult.affected > 0){
        response = roleRequestModel;
      }else {
        response = IOMsg.ERROR;
      }
    }catch (e) {
      response = e;
    }
    return this.rolePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

  async getAll(options: IPaginationOptions): Promise<RoleResponseModel> {
    let response : Pagination<RoleEntity> | string;
    try {
      response = await this.roleService.readAll(options);
    }catch (e) {
      response = e.code;
    }
    return this.rolePresenter.buildGetAllResponse(response)
  }

  async getById(id: number): Promise<RoleResponseModel> {
    let response : RoleEntity | string;
    try {
      response = await this.roleService.read(id);
      if (!response){
        response = IOMsg.USER_NOT_FOUND
      }
    }catch (e) {
      response = e.code;
    }
    return this.rolePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

  async removeById(id: number): Promise<RoleResponseModel> {
    let isDeleted : boolean;
    try {
      isDeleted = await this.roleService.delete(id);
    }catch (e) {
      isDeleted = false;
    }
    return this.rolePresenter.buildRemoveResponse(isDeleted);
  }

  async save(roleRequestModel: RoleRequestModel): Promise<RoleResponseModel> {
    let response : RoleEntity | string;
    try {
      response = await this.roleService.create(roleRequestModel);
    }catch (e) {
      response = e.code;
    }
    return this.rolePresenter.buildGetOrSaveOrUpdateResponse(response);
  }

}