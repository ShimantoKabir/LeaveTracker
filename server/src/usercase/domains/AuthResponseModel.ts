import {AuthPresenter} from "../presenters/AuthPresenter";
import {AuthRequestModel} from "./AuthRequestModel";
import {IOMsg} from "../../common/IOMsg";
import {IOCode} from "../../common/IOCode";

export class AuthResponseModel implements AuthPresenter{
  authToken: string;
  refreshToken: string
  msg: string;
  code: number;

  buildLoginOrRefreshResponse(authToken : string | null, refreshToken: string| null): Promise<AuthResponseModel> {

    this.msg = IOMsg.ERROR;
    this.code = IOCode.ERROR

    if (authToken && refreshToken){
      this.msg = IOMsg.OK;
      this.code = IOCode.OK
      this.authToken = authToken;
      this.refreshToken = refreshToken;
    }

    return Promise.resolve(this);
  }
}