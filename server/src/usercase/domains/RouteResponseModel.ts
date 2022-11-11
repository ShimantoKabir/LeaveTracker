import {RoutePresenter} from "../presenters/RoutePresenter";
import {Pagination} from "nestjs-typeorm-paginate";
import {RouteEntity} from "../../adapter/data/entities/RouteEntity";
import {IOCode} from "../../common/IOCode";
import {IOMsg} from "../../common/IOMsg";

export class RouteResponseModel implements RoutePresenter{

  code: number;
  msg: string;
  route: RouteEntity;
  routes: Pagination<RouteEntity>;

  buildGetAllResponse(pagination: Pagination<RouteEntity> | string): Promise<RouteResponseModel> {
    if (typeof pagination === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.routes = pagination;
    }else {
      this.code = IOCode.ERROR;
      this.msg = pagination;
    }
    return Promise.resolve(this);
  }

  buildGetOrSaveOrUpdateResponse(routeEntity: string | RouteEntity): Promise<RouteResponseModel> {
    if (typeof routeEntity === "object") {
      this.code = IOCode.OK;
      this.msg = IOMsg.OK;
      this.route = routeEntity;
    } else {
      this.code = IOCode.ERROR;
      this.msg = routeEntity;
    }
    return Promise.resolve(this);
  }

  buildRemoveResponse(isRemoved: boolean): Promise<RouteResponseModel> {
    if (isRemoved) {
      this.code = IOCode.OK;
      this.msg = IOMsg.DELETE_SUCCESS;
    } else {
      this.code = IOCode.ERROR;
      this.msg = IOMsg.ERROR;
    }
    return Promise.resolve(this);
  }

}