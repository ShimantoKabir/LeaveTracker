import {AuthPresenter} from "../presenters/AuthPresenter";
import {IOMsg} from "../../common/IOMsg";
import {IOCode} from "../../common/IOCode";

export class AuthResponseModel implements AuthPresenter{
  authToken: string;
  refreshToken: string
  msg: string;
  code: number;

  buildLoginOrRefreshResponse(authToken : string | null, refreshToken: string| null): Promise<AuthResponseModel> {

    this.msg = IOMsg.USER_NOT_FOUND;
    this.code = IOCode.ERROR

    if (authToken && refreshToken){
      this.msg = IOMsg.LOGIN_SUCCESS;
      this.code = IOCode.OK;
      this.authToken = authToken;
      this.refreshToken = refreshToken;
    }

    return Promise.resolve(this);
  }
}