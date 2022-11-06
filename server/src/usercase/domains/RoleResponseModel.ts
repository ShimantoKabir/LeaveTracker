import {RolePresenter} from "../presenters/RolePresenter";
import {Pagination} from "nestjs-typeorm-paginate";
import {RoleEntity} from "../../adapter/data/entities/RoleEntity";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";

export class RoleResponseModel implements RolePresenter{

  code: number;
  msg: string;
  role: RoleEntity;
  roles: Pagination<RoleEntity>;

  buildRemoveResponse(isRemoved: boolean): Promise<RoleResponseModel> {
    if (isRemoved) {
      this.code = IOCode.OK;
      this.msg = IOMsg.DELETE_SUCCESS;
    } else {
      this.code = IOCode.ERROR;
      this.msg = IOMsg.ERROR;
    }
    return Promise.resolve(this);
  }

  buildGetAllResponse(pagination: Pagination<RoleEntity> | string): Promise<RoleResponseModel> {
    if (typeof pagination === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.roles = pagination;
    }else {
      this.code = IOCode.ERROR;
      this.msg = pagination;
    }
    return Promise.resolve(this);
  }

  buildGetOrSaveOrUpdateResponse(roleEntity: string | RoleEntity): Promise<RoleResponseModel> {
    if (typeof roleEntity === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.role = roleEntity;
    } else {
      this.code = IOCode.ERROR;
      this.msg = roleEntity;
    }
    return Promise.resolve(this);
  }

}